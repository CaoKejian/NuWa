# 女娲（Nu Wa）

## 可视化搭建站

## 目录

```shell
NuWa
├─ .gitignore
├─ .nvmrc
├─ README.md
├─ build
│  ├─ compile.js
│  ├─ webpack.base.js
│  ├─ webpack.dev.js
│  └─ webpack.prod.js
├─ eslint.config.mjs
├─ index.html
├─ package
│  ├─ new-demo
│  │  ├─ index.less
│  │  └─ index.tsx
│  └─ new-demo-two
│     ├─ index.less
│     └─ index.tsx
├─ package.json
├─ src
│  ├─ App.tsx
│  └─ index.tsx
└─ tsconfig.json

```


## 使用 pnpm 安装依赖

确保你已经全局安装了 pnpm：

```bash
npm install -g pnpm
```

# 开发指南

## 启动项目（两种方式）  

1. 使用sb框架（开发、调试更佳·推荐）`pnpm storybook`  
2. 使用webpack启动（单个组件）`pnpm dev`  
注：如果使用 `webpack` 模式启动，需要自行在 `index.tsx` 里添加一些代码，如下：
```js
import { createRoot } from 'react-dom/client'
if (process.env.APP_NAME !== 'XLP') {
  createRoot(document.getElementById('app')!).render(<Demo label={''} />)
}
```

## 创建组件  

1. 使用 `npm i create-nuwa-template -g` 安装脚手架
2. 在 `package` 目录里使用`colin-add`来创建组件

## 更新组件、打包组件、发包

> 更新（上传组件信息，不包含依赖）
```bash
pnpm up:dev
pnpm up:prod
```
> 打包（打包组件）
```bash
pnpm build:dev
pnpm build:prod
```
> 发包  

先增加文件权限 `chmod +x bin/publish.bash`
```bash
pnpm publish:dev
pnpm publish:prod
```

## npm 私服 verdaccio 使用指南
- 1. 安装环境
```bash
npm i -g verdaccio (node-v16)

```
- 2. 启动 verdaccio
```bash
第一种方式：verdaccio
第二种方式：pm2 start verdaccio
```
- 3. 使用
```bash
添加用户 `npm adduser --registry http://localhost:4873/`

发包 `npm publish --registry http://localhost:4873/`

或者可以直接设置源 `npm set registry http://localhost:4873/`, 然后就可以直接不带参数使用。
```
