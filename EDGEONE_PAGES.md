# EdgeOne Pages 部署指南

将「中学理化数知识体系」系列页面发布到腾讯云 EdgeOne Pages 的配置说明。

## 项目信息

| 项 | 值 |
| --- | --- |
| 项目名（EdgeOne） | `middle-school-knowledge` |
| 部署源 | 仓库根目录 |
| 构建框架 | **Other（静态站点）** |
| 构建命令 | *（留空，无需构建）* |
| 输出目录 | `courses` |
| 默认入口 | `courses/index.html` |

## 一次性配置（EdgeOne Pages 控制台）

1. 进入 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages/)
2. 点击 **「导入项目」→「从 Git 仓库导入」**
3. 选择 GitHub，授权并选择本仓库（`middle-school-knowledge`）
4. 框架选择 **Other（静态站点）**
5. 配置构建设置：
   - 构建命令：**留空**
   - 输出目录：**`courses`**（**注意**：不要写 `./`，直接写相对仓库根的路径）
   - 安装命令：**留空**
6. 在「环境变量」中按需添加（如暂不需要可跳过）
7. 点击 **「开始部署」**

> 控制台会优先读取仓库根目录下的 `edgeone.json`，字段 `build.outputDir` 会自动覆盖输出目录设置。

## 部署触发

- **自动部署**：每次 `git push` 到 `main` 分支，EdgeOne Pages 会自动重新部署
- **预览部署**：每个 PR 会得到一个临时预览链接（控制台开启后）

## 与 GitHub Pages 的关系

- 两个平台互不影响，可同时运行
- GitHub Pages 工作流文件保留在 `.github/workflows/deploy-pages.yml`
- EdgeOne Pages 读取的是 Git 仓库本身，不需要额外的 workflow 文件

## 常用操作

| 目的 | 操作 |
| --- | --- |
| 查看部署状态 | EdgeOne 控制台 → 项目 → 「部署记录」 |
| 绑定自定义域名 | EdgeOne 控制台 → 项目 → 「自定义域名」 |
| 查看访问统计 | EdgeOne 控制台 → 项目 → 「流量分析」 |
| 回滚到旧版本 | EdgeOne 控制台 → 项目 → 「部署记录」→ 「回滚」 |

## 自定义配置（如有需要）

可在 `edgeone.json` 中扩展更多配置：

```json
{
  "name": "middle-school-knowledge",
  "build": {
    "outputDir": "courses",
    "installCommand": "",
    "buildCommand": ""
  }
}
```