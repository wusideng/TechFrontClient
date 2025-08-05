import * as qiniu from "qiniu";
import dotenv from "dotenv";
dotenv.config();

//需要填写你的 Access Key 和 Secret Key
const accessKey = process.env.cdn_access_key as string;
const secretKey = process.env.cdn_secret_key as string;
const bucket = process.env.cdn_bucket as string;

// 上传单个文件
export const uploadSingleFile = (localFilePath) => {
  const fileName = localFilePath.split("/").pop() as string;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: bucket,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config();
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const key = `devclient/js/${fileName}`;
  // 文件上传
  formUploader
    .putFile(uploadToken, key, localFilePath, putExtra)
    .then(({ data, resp }) => {
      if (resp.statusCode === 200) {
        console.log(data);
        console.log("上传成功");
      } else {
        console.log(resp.statusCode);
        console.log(data);
        console.log("上传失败");
      }
    })
    .catch((err) => {
      console.log("failed", err);
      console.log("上传失败");
    });
};
