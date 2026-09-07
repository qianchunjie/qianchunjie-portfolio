// server.js —— 把静态网页 + AI 助手后端跑在同一个 Node 服务里。
// 适用于 Zeabur / Render / Railway 等「Node 服务」型平台。
// 本地测试：node server.js 后，浏览器打开 http://localhost:3000
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import chatHandler from "./api/chat.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

// 拦截对后端/源码文件的直接访问，留个保险（仓库虽是私有，但防误暴露）。
app.use((req, res, next) => {
  if (req.method === "GET" && (req.path.startsWith("/api/") || req.path === "/server.js" || req.path === "/package.json")) {
    return res.status(404).end();
  }
  next();
});

// AI 助手接口（逻辑在 api/chat.js 里）。
app.post("/api/chat", chatHandler);

// 静态网页（index.html、styles.css、script.js、assets/ 等）。
app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`AI 助手已启动：http://localhost:${port}`));
