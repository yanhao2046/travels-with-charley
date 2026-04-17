# 部署到 Cloudflare Workers Static Assets

> 本仓库已配置好 `wrangler.json`，所有静态文件位于 `public/`。
> Cloudflare 部署需要 OAuth 授权，无法在 AI 辅助会话中完成，最后一步请你在终端跑。

## 一次性：登录 Cloudflare

在本地终端（**不是** Claude 会话里）跑：

```bash
cd /Users/yanhao/Library/CloudStorage/Dropbox/3_MyYears/0_2026/AIwork-2026/travels-with-charley
npx wrangler login
```

会自动弹浏览器到 Cloudflare 登录页，点 **Allow**。完成后终端会显示 `Successfully logged in`。

> 如果登录提示已 logged in（之前 word-quest 那次留下的），跳过这步。

## 部署

```bash
npx wrangler deploy
```

首次部署会创建新 Worker `travels-with-charley`，输出会带一个 URL：
`https://travels-with-charley.<你的子域>.workers.dev`

## 后续更新

改完代码 → `git push` → `npx wrangler deploy`。

## 配置说明

- `wrangler.json` — 部署配置，`assets.directory` 指向 `./public`
- `public/` — 所有要发布的静态文件（index.html / css / js / images）
- 项目根目录的其他文件（HANDOVER.md / wrangler.json / .git）**不会**被上传

## 本地预览（开发用）

```bash
cd public
python3 -m http.server 8766
# 浏览器打开 http://localhost:8766
```

或在 Claude Code 里用 preview_start `travels-charley`。

## 故障排查

- **"In a non-interactive environment, it's necessary to set CLOUDFLARE_API_TOKEN"**
  → 没登录，跑 `npx wrangler login`
- **上传文件数量异常多**（比如 89 而不是 11）
  → 检查 `wrangler.json` 的 `assets.directory` 是否指向了根目录而非 `./public`
- **部署成功但页面 404**
  → 检查 `public/index.html` 存在
