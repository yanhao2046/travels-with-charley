# Travels with Charley 项目 — Session 交接文档

> 生成时间：26-04-17 11:05
> 源 Session ID：`13ad75cb-c11f-4517-b002-3ea40943d035`
> 项目目录：`/Users/yanhao/Library/CloudStorage/Dropbox/3_MyYears/0_2026/AIwork-2026/travels-with-charley/`
> 原始设计文档：`/Users/yanhao/.claude/plans/nested-wishing-pudding.md`

---

## 一、Hang 住的根因

**直接原因**：对话历史里累积了 **200+ 张超过 2000px 的图片**，触发 Claude API 多图请求的硬限制（每张图边长不能超 2000px），此后每一轮请求都被服务端拒绝。

**怎么累积起来的**：Claude Code 的 `Read` 工具在读 PDF 时，**会把每一页转成图片**（不是文字）。这本书英文 PDF 共 277 页，按每次 20 页的分批读取，一共触发了约 14 次 Read PDF，每次产出 ~20 张图。结果是：为了"提取书中的旅行路线信息"，把整本书的页面渲染图全部灌进了对话上下文。

**为什么之前没炸，后面突然炸**：这个 2000px 限制是**多图请求才检查**，单图不检查。一开始图片还不多的时候没触发这条硬规则；但当页数累积到足够多之后，每轮请求都被判成"many-image"并拒掉。

**判别特征**：错误文案固定为 `An image in the conversation exceeds the dimension limit for many-image requests (2000px)`。看到这条就是历史图片累积问题，**不是当前这轮发的内容出了问题**。

---

## 二、下个 session 如何避免同类问题

### 铁律 1：**不要用 Read 工具读大 PDF**

Read PDF 一页一图，超过 10 页就有风险，超过 50 页几乎必炸。

**替代方案（按优先级）**：

1. **先用 CLI 把 PDF 转成文本**，再 Read 文本文件：
   ```bash
   # pdftotext 保留段落结构，适合阅读
   pdftotext -layout "原PDF.pdf" "/tmp/book.txt"
   # 然后 Read /tmp/book.txt，纯文本不产生图片
   ```
2. **用 Agent 子上下文隔离**：`Agent(subagent_type=Explore, ...)` 让子 agent 去读 PDF，它返回一个纯文字摘要给主对话。子 agent 的完整上下文（含图片）不回流到主 session。
3. **分章读 + 读完就丢**：如果必须用 Read PDF，每次 pages 不超过 5 页，并且**读完立刻用文字 summary 覆盖**，避免累积。但这策略不可靠，不如用 1 或 2。

### 铁律 2：**本项目不用再读 PDF 了**

所有路线/站点/引文信息都已经萃取到 `js/route-data.js`（36 个站点、中英双语、时间、书中摘录）。下一个 session **不要再碰那个 PDF**。如果需要补充某个站点的细节，让用户直接粘贴相关段落的文字。

### 铁律 3：**截图也要省着用**

Chrome MCP 的 `screenshot` 返回 1568×744 左右的 JPEG，单张不超 2000px，但**累计很多张后也会拖慢**（我这轮耗时 3m50s 就是历史图片重复处理导致）。验证用尽量优先 `read_console_messages` / `javascript_tool`（纯文字），只在需要"眼见为实"时才截图，且**不要连续截超过 5 张**。

### 铁律 4：**看到 "2000px" 错误立即开新 session**

不要在已污染的 session 里挣扎（重试、resume、换 model 都无效，图片在历史里就是在）。直接：
1. 记下当前状态到一个 handover.md（最好代码里留 `TODO:` 锚点）
2. 新开 session 加载 handover 继续

---

## 三、已完成部分

### 项目结构（全部已落盘）
```
travels-with-charley/
├── index.html                    ✅ 全屏地图 + 右侧浮动面板 + Hero 按钮
├── css/style.css                 ✅ 复古公路旅行风格（暖色+衬线）
├── js/
│   ├── route-data.js             ✅ 36 站点全数据（中英双语、1960年时间、摘要、书摘+中译、情感标签）
│   ├── map.js                    ✅ Leaflet 地图、四色分段、方向箭头、自定义标记
│   ├── app.js                    ✅ 目录、详情卡、时间线、播放旅程、键盘导航、三区联动、Hero modal
│   └── stop-image-queries.js     ⚠️ 已生成（95 条/36 站）但 **未挂到 index.html**
└── .claude/launch.json           ✅ 预览服务器配置（port 8765）
```

### 已验证
- 本地服务器（port 8765）能跑起来、页面 HTTP 200
- 36 个 markers + 36 个目录项 + 20 个地图瓦片全部正常
- 语法错误修过一次（中文摘要里的 `"Open/Vacancy"` 英文引号破坏了 JS 字符串 → 批量换成弯引号）
- Hero 按钮能点开 modal（图片链接跳转方案，不内嵌图片）

---

## 四、未完成任务（按优先级）

### P0 — 必须完成
1. **挂载 `stop-image-queries.js` 到 `index.html`**
   - 在 `index.html` 的 `<script src="js/route-data.js">` 后面加一行：
     ```html
     <script src="js/stop-image-queries.js"></script>
     ```
2. **在 `app.js` 里消费 `STOP_IMAGE_QUERIES`**
   - `getStopImageLinks(stop)` 现在只基于 `stop.nameEn` 拼一个通用搜索
   - 改成优先从 `STOP_IMAGE_QUERIES[stop.id]` 读取**情节相关**的 2-4 个具体场景
   - 每个场景渲染成一个按钮（用 Bing 图片搜索作为主链接，国内可直达）
3. **启动预览验证**
   - `cd travels-with-charley && python3 -m http.server 8765`
   - Chrome 打开 `http://localhost:8765`，**依次**点几个站点确认场景按钮正常渲染和跳转
   - **记住**：验证时优先用 `read_console_messages` 和 `javascript_tool` 读 DOM，少用 screenshot

### P1 — 收尾
4. **写 README**：项目介绍、本地运行方式（`python3 -m http.server 8765`）、键盘快捷键说明
5. **GitHub Pages 部署说明**：在 README 里给出操作步骤（new repo → push → Settings → Pages → 选 main 分支根目录）
6. **打磨细节**：Hero modal 的三张卡（Steinbeck / Charley / Rocinante）目前是图标占位，可以给每张卡加一段书中相关的原文短摘要（用户已经表达对"文字 → 感性印象"的诉求）

### P2 — 可选增强
7. **情感标签筛选联动时间线**：代码里有 `tags`（如"孤独""温情""愤怒"等），可以做高亮或过滤
8. **移动端响应式**：当前是桌面优先，手机上浮动面板需要单独适配

---

## 五、给下一个 session 的开场白（建议）

贴这段给新 session：

```
我在做一个 Travels with Charley 的可视化项目。项目目录：
/Users/yanhao/Library/CloudStorage/Dropbox/3_MyYears/0_2026/AIwork-2026/travels-with-charley/

请先读这两个文件：
1. HANDOVER.md（本项目根目录）— 项目状态和未完成任务
2. 设计文档：/Users/yanhao/.claude/plans/nested-wishing-pudding.md

**注意**：**不要读书的 PDF**（会触发图片累积问题）。所有需要的路线信息已经在 js/route-data.js 里。

从 HANDOVER 的 P0 清单开始做。
```

---

## 六、关键文件引用

- 完整对话骨架（纯文字，去掉了图片二进制）：`/tmp/handover-extract/13ad75cb-skeleton.txt`
- 原 session JSONL（23MB，含图片 base64）：`~/.claude/projects/-Users-yanhao-Library-CloudStorage-Dropbox-3-MyYears-0-2026-AIwork-2026/13ad75cb-c11f-4517-b002-3ea40943d035.jsonl`
- 本书 PDF（**下次不要再读**）：`/Users/yanhao/Library/CloudStorage/Dropbox/3_MyYears/0_2026/读书-2026/下载图书/旅行/Travels with Charley in Search of America_ .pdf`
