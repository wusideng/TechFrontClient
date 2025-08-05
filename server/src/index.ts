import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import ngrok from "@ngrok/ngrok";

const app = express();
const PORT = 3000;
const distPath = path.join(__dirname, "../../dist");

const proxy = createProxyMiddleware({
  target: "http://localhost:8000",
  changeOrigin: true,
  secure: false,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log("Proxying request:", req.method, req.url);
    },
    proxyRes: (proxyRes, req, res) => {
      console.log("Received response:", proxyRes.statusCode);
    },
    error: (err, req, res) => {
      console.error("Proxy error:", err);
    },
  },
});
// 添加中间件为所有请求添加 ngrok-skip-browser-warning 头
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

app.use("/api", proxy);
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
    credentials: true,
  })
);
app.use("/devpayclient", express.static(distPath));
app.get("/", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// 启动 Express 服务器和 ngrok
async function startServer() {
  try {
    // 启动 Express 服务器
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // 配置并启动 ngrok

    const listener = await ngrok.connect({
      addr: PORT,
      domain: "tough-suitably-eagle.ngrok-free.app", // 你的固定域名
      authtoken: "2tMS7MEdik8Zy7OsIRSDYCzp2Az_31MeT3c796aCeeN91yg7g",
    });

    console.log(`Ngrok tunnel established at: ${listener.url()}`);

    // 关闭处理
    process.on("SIGTERM", async () => {
      await ngrok.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
