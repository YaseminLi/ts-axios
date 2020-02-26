# 使用TypeScript实现axios 
使用TypeScript实现了一个完整的axios JS库，包括基础功能、异常处理、接口扩展、实现拦截器及配置化、取消等功能，然后进行完整的单元测试，最后把开发的JS库打包并发布到npm上。[学习地址](https://coding.imooc.com/learn/list/330.html)

## 初始化项目
使用 TypeScript 去写一个项目的时候，需要配置 TypeScript 的编译配置文件 `tsconfig.json` 以及`tslint.json` 文件。

`TypeScript library starter` ：帮我们生成好这些初始化文件

它是一个开源的 TypeScript 开发基础库的脚手架工具，可以帮助我们快速初始化一个 TypeScript 项目，[官网地址](https://github.com/alexjoverm/typescript-library-starter)

## 目录文件
```
├── examples // demo测试目录
├── doc //实现axios库的过程
├── CONTRIBUTING.md
├── LICENSE 
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── src // 源码目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件,[配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
└── tslint.json // TypeScript lint 文件
```

### 用到的前端工具
- 使用 [RollupJS](https://rollupjs.org/) 打包构建项目。
- 使用 [Prettier](https://github.com/prettier/prettier) 和 [TSLint](https://palantir.github.io/tslint/) 格式化代码以及保证代码风格一致性。
- 使用 [TypeDoc](https://typedoc.org/) 帮助我们自动生成文档并部署到 GitHub pages。
- 使用 [Jest](https://jestjs.io/)做单元测试。
- 使用 [Commitizen](https://github.com/commitizen/cz-cli)生成规范化的提交注释。
- 使用 [Semantic release](https://github.com/semantic-release/semantic-release)管理版本和发布。
- 使用 [husky](https://github.com/typicode/husky)更简单地使用 git hooks。
- 使用 [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog)通过代码提交信息自动生成 change log。


### Npm Scripts
 - `npm run lint`: 使用 TSLint 工具检查 `src` 和 `test` 目录下 TypeScript 代码的可读性、可维护性和功能性错误。
 - `npm start`: 观察者模式运行 `rollup` 工具打包代码。
 - `npm test`: 运行 `jest` 工具跑单元测试。
 - `npm run commit`: 运行 `commitizen` 工具提交格式化的 `git commit` 注释。
 - `npm run build`: 运行 `rollup` 编译打包 TypeScript 代码，并运行 `typedoc` 工具生成文档。
 - `npm run dev`: 运行`node examples/server.js`,利用 Node.js 的 express 库去运行demo
 




