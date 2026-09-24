# 量化研究个人主页

网站地址：https://ziyao-zhao-quant.github.io/

仓库：https://github.com/ziyao-zhao-quant/ziyao-zhao-quant.github.io

适用于 GitHub Pages 的静态主页，无框架、无第三方运行时依赖。包含教育背景、论文、项目、实习经历、策略回测和联系方式；支持手机与键盘访问。内容依据用户提供的 2026-09-21 版简历整理，邮箱经用户授权公开，原始简历和手机号没有加入网站。未提供的论文链接和净值序列保持为空。GitHub 链接使用已连接账户；如修改用户名，应同步更新 `profile.github`。

论文保留 WSDM 2027 审稿中状态。国债策略收益与 Sharpe 指标按简历原值展示，数据区间不冒充精确回测区间。LLM 策略“年化收益提高 17.6%”因相对增幅/百分点口径不明，暂未在页面量化展示。

## 更新内容

编辑 `content.js`。所有文本以纯文本安全渲染；未填写简历和社交链接时不显示对应入口。可将简历、论文 PDF 放入 `files/` 并填写相对路径，例如 `files/cv.pdf`。

- `profile`：公开姓名、简介、邮箱、GitHub 完整地址及简历路径。
- `publications`：标题、作者、期刊/会议、年份、简介和论文链接。
- `projects`：标题、时间、简介、技术标签和仓库链接。
- `experience`：单位、职位、时间、介绍和工作要点。
- `strategies`：策略介绍、回测区间、基准、费用、方法、指标和净值。

每类对象的字段已在 `content.js` 注释中说明。条目按输入顺序展示，可把最重要的成果放在最前面。

### 策略数据约定

`metrics` 直接展示已核实的指标，不擅自计算或推断收益率、Sharpe 比率或回撤。每项形如 `{ label: "指标名称", value: "实际结果" }`。

`equity` 为日期升序、至少两条的净值记录，每条包含 `date`（YYYY-MM-DD）、`strategy`（正有限数），以及可选的 `benchmark`。如果有基准，每一条都必须提供同日期的基准净值。曲线保留原始净值，不自动归一化；请确保策略和基准口径一致。横轴按真实日历间隔绘制。无效数据将显示提示，不绘制误导性的曲线。图下提供可展开的数据表。

请注明费用和滑点、数据频率、调仓方式、样本内/外划分等实验设定。只有已填写的数据会展示，空白数据不会被替换为示例业绩。

## 本地预览

在当前目录执行：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

浏览器访问 `http://127.0.0.1:4173`。修改后刷新页面即可。按 Ctrl+C 停止。

## 发布到 GitHub Pages

1. 在 GitHub 创建名为 `你的用户名.github.io` 的仓库（用户名需一致）。
2. 把 `index.html`、`content.js`、`style.css`、`site.js` 和 `.nojekyll` 提交并推送到仓库。
3. 打开仓库 **Settings → Pages**，在 **Build and deployment → Source** 选择 **Deploy from a branch**。
4. 选择包含网站文件的分支（通常为 `main`）和 **/(root)**，保存。
5. 等待 GitHub Pages 部署完成，访问 `https://你的用户名.github.io/`。

无需 GitHub Actions 自定义工作流或构建命令。后续推送同一发布分支会自动更新网站。部署前补齐希望公开的个人资料。

官方操作说明：https://docs.github.com/en/pages/quickstart

## 文件

- `index.html`：页面结构及基础元信息。
- `content.js`：唯一的内容编辑入口。
- `style.css`：响应式样式。
- `site.js`：内容渲染、净值图与数据检查。

如使用自定义域名，后续再配置 Pages 的 Custom domain 和 DNS，无需修改网站结构。
