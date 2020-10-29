# Next 已经同构 的微前端 架子

# 目录

| 文件   | 描述  具体逻辑看文件注释 |
| ------ | ------------------------ |
| client | 业务同构                 |
| course | 子站点 微前端 vue        |
| www    | 主站点 vue               |
# 命令
|            | 描述  具体逻辑看文件注释  |
| ---------- | ------------------------- |
| start      | 启动所有 packages         |
| start:www  | 启动PC                    |
| build      | build dev                 |
| build:test | build testing             |
| build:uat  | build uat                 |
| build:pro  | build pro                 |
| build:all  | build 所有环境            |
| serve      | nuxt      serve  本地预览 |
| init       | 初始化                    |
| clean      | 清理    packages          |
| clean:all  | 清理    所有依赖          |
| publish    | 更改发布版本              |