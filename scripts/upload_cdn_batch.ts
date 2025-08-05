import * as qiniu from "qiniu";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

//需要填写你的 Access Key 和 Secret Key
const accessKey = process.env.cdn_access_key as string;
const secretKey = process.env.cdn_secret_key as string;
const bucket = process.env.cdn_bucket as string;

async function uploadFolderAndRefreshCDN(
  folderPath: string,
  targetPrefix: string
): Promise<void> {
  // 创建认证对象
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  // 创建上传配置
  const config = new qiniu.conf.Config();

  // 创建上传器
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  // 创建 CDN 管理器
  const cdnManager = new qiniu.cdn.CdnManager(mac);

  // 创建存储空间管理器
  const bucketManager = new qiniu.rs.BucketManager(mac, config);

  // 确保目标前缀以斜杠结尾（如果不为空）
  if (targetPrefix && !targetPrefix.endsWith("/")) {
    targetPrefix = `${targetPrefix}/`;
  }

  // 删除目标文件夹中的所有文件
  console.log(`准备删除目标前缀 ${targetPrefix} 中的所有文件...`);
  await deleteFilesWithPrefix(bucketManager, bucket, targetPrefix);
  console.log(`目标前缀 ${targetPrefix} 中的文件已删除`);

  // 生成上传凭证 (删除文件后再生成上传凭证，以便有最新权限)
  const options = {
    scope: bucket,
    expires: 3600, // 1小时有效期
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  // 存储需要刷新的 URL 列表
  const urlsToRefresh: string[] = [];

  // 递归上传文件夹中的所有文件，并收集需要刷新的 URL
  await uploadFolderRecursive(
    folderPath,
    targetPrefix,
    formUploader,
    putExtra,
    uploadToken,
    urlsToRefresh
  );

  // 如果有需要刷新的 URL，批量刷新 CDN
  if (urlsToRefresh.length > 0) {
    await refreshCDN(cdnManager, urlsToRefresh);
  } else {
    console.log("没有需要刷新的 CDN URL");
  }

  console.log("文件夹上传和 CDN 刷新完成!");
}

/**
 * 删除指定前缀的所有文件
 */
async function deleteFilesWithPrefix(
  bucketManager: qiniu.rs.BucketManager,
  bucket: string,
  prefix: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 定义递归列举和删除函数
    const listAndDeleteFiles = (marker: string = "") => {
      // 列举文件
      bucketManager.listPrefix(
        bucket,
        {
          prefix: prefix,
          marker: marker,
          limit: 1000, // 每次列举1000个文件
        },
        (err, respBody, respInfo) => {
          if (err) {
            console.error("列举文件失败:", err);
            reject(err);
            return;
          }

          if (respInfo.statusCode !== 200) {
            console.error(`列举文件失败, 状态码: ${respInfo.statusCode}`);
            console.error(respBody);
            reject(new Error(`列举文件失败: ${respInfo.statusCode}`));
            return;
          }

          // 如果没有文件，直接完成
          if (!respBody.items || respBody.items.length === 0) {
            resolve();
            return;
          }

          console.log(`找到 ${respBody.items.length} 个文件需要删除`);

          // 准备批量操作
          const deleteOps = respBody.items.map((item: any) => {
            return qiniu.rs.deleteOp(bucket, item.key);
          });

          // 批量删除文件 (每次最多1000个)
          const BATCH_SIZE = 1000;
          const deleteBatches: Promise<void>[] = []; // 明确指定数组类型

          for (let i = 0; i < deleteOps.length; i += BATCH_SIZE) {
            const batch = deleteOps.slice(i, i + BATCH_SIZE);

            const deletePromise = new Promise<void>(
              (resolveBatch, rejectBatch) => {
                bucketManager.batch(batch, (err, respBody, respInfo) => {
                  if (err) {
                    console.error("批量删除失败:", err);
                    rejectBatch(err);
                    return;
                  }

                  if (respInfo.statusCode !== 200) {
                    console.error(
                      `批量删除失败, 状态码: ${respInfo.statusCode}`
                    );
                    rejectBatch(
                      new Error(`批量删除失败: ${respInfo.statusCode}`)
                    );
                    return;
                  }

                  console.log(`成功删除一批文件，数量: ${batch.length}`);
                  resolveBatch();
                });
              }
            );

            deleteBatches.push(deletePromise);
          }

          Promise.all(deleteBatches)
            .then(() => {
              // 检查是否有更多文件需要列举
              if (respBody.marker) {
                // 继续列举下一批文件
                listAndDeleteFiles(respBody.marker);
              } else {
                // 所有文件都已处理完毕
                resolve();
              }
            })
            .catch((err) => {
              reject(err);
            });
        }
      );
    };

    // 开始列举和删除文件
    listAndDeleteFiles();
  });
}

/**
 * 递归上传文件夹及其子文件夹
 */
async function uploadFolderRecursive(
  folderPath: string,
  targetPrefix: string,
  formUploader: qiniu.form_up.FormUploader,
  putExtra: qiniu.form_up.PutExtra,
  uploadToken: string,
  urlsToRefresh: string[]
): Promise<void> {
  // 读取文件夹内容
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const localPath = path.join(folderPath, file);
    const stats = fs.statSync(localPath);

    if (stats.isDirectory()) {
      // 如果是文件夹，递归上传
      const newPrefix = `${targetPrefix}${file}/`;
      await uploadFolderRecursive(
        localPath,
        newPrefix,
        formUploader,
        putExtra,
        uploadToken,
        urlsToRefresh
      );
    } else {
      // 如果是文件，直接上传
      const key = `${targetPrefix}${file}`;

      // 上传文件并获取上传结果
      const uploadSuccess = await uploadSingleFile(
        localPath,
        key,
        formUploader,
        putExtra,
        uploadToken
      );

      // 如果上传成功，添加到需要刷新的 URL 列表
      if (uploadSuccess) {
        // 构建完整的 CDN URL
        const cdnUrl = `${process.env.staticUrl}/${key}`;
        // 移除可能的双斜杠（除了 http:// 或 https:// 之外）
        const normalizedCdnUrl = cdnUrl.replace(/([^:])\/\//g, "$1/");
        urlsToRefresh.push(normalizedCdnUrl);
      }
    }
  }
}

/**
 * 上传单个文件
 * @returns 是否上传成功
 */
function uploadSingleFile(
  localPath: string,
  key: string,
  formUploader: qiniu.form_up.FormUploader,
  putExtra: qiniu.form_up.PutExtra,
  uploadToken: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    console.log(`开始上传: ${localPath} -> ${key}`);

    formUploader.putFile(
      uploadToken,
      key,
      localPath,
      putExtra,
      (err, respBody, respInfo) => {
        if (err) {
          console.error(`上传 ${localPath} 失败:`, err);
          resolve(false); // 返回 false 表示上传失败，但不中断整个流程
          return;
        }

        if (respInfo.statusCode === 200) {
          console.log(`上传成功: ${key}`);
          resolve(true); // 返回 true 表示上传成功
        } else {
          console.error(
            `上传 ${localPath} 失败, 状态码: ${respInfo.statusCode}`
          );
          console.error(respBody);
          resolve(false); // 返回 false 表示上传失败，但不中断整个流程
        }
      }
    );
  });
}

/**
 * 批量刷新 CDN
 */
function refreshCDN(
  cdnManager: qiniu.cdn.CdnManager,
  urls: string[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 七牛云 API 对单次刷新 URL 数量有限制（通常是 100 个）
    const BATCH_SIZE = 100;
    const refreshPromises: Promise<void>[] = [];

    // 分批处理 URLs
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const urlsBatch = urls.slice(i, i + BATCH_SIZE);
      console.log(
        `准备刷新 CDN URL 批次 ${Math.floor(i / BATCH_SIZE) + 1}, URLs 数量: ${
          urlsBatch.length
        }`
      );

      const refreshPromise = new Promise<void>(
        (resolveRefresh, rejectRefresh) => {
          cdnManager.refreshUrls(urlsBatch, (err, respBody, respInfo) => {
            if (err) {
              console.error("刷新 CDN 出错:", err);
              rejectRefresh(err);
              return;
            }

            if (respInfo.statusCode === 200) {
              console.log(
                `成功刷新 CDN 批次 ${Math.floor(i / BATCH_SIZE) + 1}`
              );
              if (respBody) {
                console.log("刷新结果:", JSON.stringify(respBody, null, 2));
              }
              resolveRefresh();
            } else {
              console.error(`刷新 CDN 失败, 状态码: ${respInfo.statusCode}`);
              console.error(respBody);
              rejectRefresh(new Error(`刷新 CDN 失败: ${respInfo.statusCode}`));
            }
          });
        }
      );

      refreshPromises.push(refreshPromise);
    }

    // 等待所有刷新任务完成
    Promise.all(refreshPromises)
      .then(() => {
        console.log(`所有 CDN URLs 刷新完成，共 ${urls.length} 个 URLs`);
        resolve();
      })
      .catch((error) => {
        console.error("部分 CDN 刷新失败:", error);
        reject(error);
      });
  });
}

// 使用示例
async function main() {
  // 本地文件夹路径和目标前缀
  const folderPath = "./dist";
  const targetPrefix = process.env.baseUrl as string; // 可以为空字符串，表示上传到根目录

  try {
    await uploadFolderAndRefreshCDN(folderPath, targetPrefix);
    console.log("所有文件上传完成并刷新 CDN!");
  } catch (error) {
    console.error("上传或刷新过程中出错:", error);
  }
}

// 执行主函数
main().catch(console.error);
