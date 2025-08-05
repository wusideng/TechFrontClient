// scripts/agreement-loader.ts
import * as fs from "fs";
import * as path from "path";

// 解析文本为HTML结构的函数
function parseTextToHtml(text: string): string {
  console.log(text);
  // 保留原始换行，将文本分成段落
  const paragraphs = text.split("\n");

  let htmlContent = paragraphs
    .map((paragraph, index) => {
      if (index == 0) {
        return `<p class="main_title">${paragraph}</p>`;
      }
      if (!paragraph.trim()) return "";
      //   console.log(paragraph);
      // 检测标题
      if (
        /^[一二三四五六七八九十]+[、.．]\s*\S+/.test(paragraph) ||
        /^\d+[、.．]\s*\S+/.test(paragraph) ||
        /^[（(]\d+[)）]\s*\S+/.test(paragraph) ||
        paragraph.startsWith("目录") ||
        paragraph.startsWith("信息收集范围与使用目的") ||
        paragraph.startsWith("智能技术与Cookie应用") ||
        paragraph.startsWith("信息共享、转移与对外披露") ||
        paragraph.startsWith("信息储存期限与安全保障") ||
        paragraph.startsWith("您的信息控制权") ||
        paragraph.startsWith("未成年人保护专项规定") ||
        paragraph.startsWith("隐私政策更新机制") ||
        paragraph.startsWith("联系与反馈渠道") ||
        paragraph.startsWith("术语与定义说明")
      ) {
        // 处理段落内的换行
        const formattedParagraph = paragraph.split("\n").join("<br>");
        // console.log(formattedParagraph);
        return `<p class="bold">${formattedParagraph}</p>`;
      }
      if (
        paragraph.startsWith("本协议自") ||
        paragraph.startsWith("版本更新日期") ||
        paragraph.trim() == "尚阳雕漆文化有限公司"
      ) {
        const formattedParagraph = paragraph.split("\n").join("<br>");
        // console.log(formattedParagraph);
        return `<p class="last_p">${formattedParagraph}</p>`;
      }

      // 检测主标题
      if (
        index === 0 &&
        (paragraph.includes("协议") ||
          paragraph.includes("政策") ||
          paragraph.includes("声明"))
      ) {
        // 处理段落内的换行
        const formattedParagraph = paragraph.split("\n").join("<br>");
        return `<p class="bold">${formattedParagraph}</p>`;
      }

      // 普通段落 - 保留原始换行
      const formattedParagraph = paragraph.split("\n").join("<br>");
      return `<p>${formattedParagraph}</p>`;
    })
    .join("\n");

  return htmlContent;
}

// 扫描协议文件并转换为JS模块
const convertAgreements = (): void => {
  const agreementDir = path.resolve(__dirname, "../src/assets/agreements");
  const outputDir = path.resolve(__dirname, "../src/generated");

  // 检查源目录是否存在
  if (!fs.existsSync(agreementDir)) {
    console.error(`源目录不存在: ${agreementDir}`);
    fs.mkdirSync(agreementDir, { recursive: true });
    console.log(`已创建源目录: ${agreementDir}`);
    return; // 如果源目录不存在，则退出函数
  }

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`已创建输出目录: ${outputDir}`);
  }

  // 读取所有txt文件
  const txtFiles = fs
    .readdirSync(agreementDir)
    .filter((file) => file.endsWith(".txt"));

  if (txtFiles.length === 0) {
    console.log(`没有在 ${agreementDir} 中找到任何.txt文件`);
    return;
  }

  // 处理每个文件
  txtFiles.forEach((file) => {
    const filePath = path.join(agreementDir, file);

    try {
      const content = fs.readFileSync(filePath, "utf8");

      // 将内容转换为HTML格式
      const htmlContent = parseTextToHtml(content);

      // 创建JS模块 - 使用正确的HTML包装
      const jsContent = `
// 自动生成的文件，请勿手动修改
// 源文件: ${file}
const content = \`
<div class="agreement_wrapper">
${htmlContent}
</div>
\`;

export default content;
`;

      // 文件名转换
      const outputFileName = file.replace(".txt", ".ts");
      const outputPath = path.join(outputDir, outputFileName);

      // 写入文件
      fs.writeFileSync(outputPath, jsContent, "utf8");
      console.log(`成功转换: ${file} -> ${outputFileName}`);
    } catch (error) {
      console.error(`处理文件 ${file} 时出错:`, error);
    }
  });

  console.log(`完成! ${txtFiles.length} 个文件已转换`);
};

// 执行转换
try {
  convertAgreements();
} catch (error) {
  console.error("转换过程中发生错误:", error);
}
