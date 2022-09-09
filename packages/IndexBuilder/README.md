# chinese-poetry-index

这个是构建 chinese-poetry 仓库索引的一个库，目的是抽离出规范的文本特征对象，以便我们能够统一调用

蒙学未完成

```sh
pnpm build # 规范化文件
pnpm build:index # 建立索引 json 文件
pnpm open # 打开 meilisearch 容器 需要 docker 支持和预先 pull meilisearch
pnpm upload # 上传索引 json 文件

# 古诗词
```
