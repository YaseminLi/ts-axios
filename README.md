使用TypeScript实现axios 

笔记、课程地址(https://coding.imooc.com/learn/list/330.html)

项目初始化

demo

# 初始化项目

## 创建代码仓库

在 GitHub 上创建一个 repo，填好 repo 名称，以及写一下 README，对项目先做个简单的描述。

通常我们初始化一个项目，需要配置一大堆东西，比如 `package.json`、`.editorconfig`、`.gitignore` 等；还包括一些构建工具如 `rollup`、`webpack` 以及它们的配置。

当我们使用 TypeScript 去写一个项目的时候，还需要配置 TypeScript 的编译配置文件 `tsconfig.json` 以及
`tslint.json` 文件。

`TypeScript library starter` ：帮我们生成好这些初始化文件

## TypeScript library starter

它是一个开源的 TypeScript 开发基础库的脚手架工具，可以帮助我们快速初始化一个 TypeScript 项目，[官网地址](https://github.com/alexjoverm/typescript-library-starter)

### 使用方式

```bash
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios

npm install
```

先通过 `git clone` 把项目代码拉下来到我们的 `ts-axios` 目录，然后运行 `npm install` 安装依赖，并且给项目命名，我们仍然使用 `ts-axios`。

### 目录文件介绍

```
├── CONTRIBUTING.md
├── LICENSE 
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── src // 源码目录
├── test // 测试目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件,[配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
└── tslint.json // TypeScript lint 文件
```

### 优秀工具集成

使用 `TypeScript library starter` 创建的项目集成了很多优秀的开源工具：

- 使用 [RollupJS](https://rollupjs.org/) 帮助我们打包。
- 使用 [Prettier](https://github.com/prettier/prettier) 和 [TSLint](https://palantir.github.io/tslint/) 帮助我们格式化代码以及保证代码风格一致性。
- 使用 [TypeDoc](https://typedoc.org/) 帮助我们自动生成文档并部署到 GitHub pages。
- 使用 [Jest](https://jestjs.io/)帮助我们做单元测试。
- 使用 [Commitizen](https://github.com/commitizen/cz-cli)帮助我们生成规范化的提交注释。
- 使用 [Semantic release](https://github.com/semantic-release/semantic-release)帮助我们管理版本和发布。
- 使用 [husky](https://github.com/typicode/husky)帮助我们更简单地使用 git hooks。
- 使用 [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog)帮助我们通过代码提交信息自动生成 change log。


### Npm Scripts

`TypeScript library starter` 同样在 `package.json` 中帮我们配置了一些 `npm scripts`：

 - `npm run lint`: 使用 TSLint 工具检查 `src` 和 `test` 目录下 TypeScript 代码的可读性、可维护性和功能性错误。
 - `npm start`: 观察者模式运行 `rollup` 工具打包代码。
 - `npm test`: 运行 `jest` 工具跑单元测试。
 - `npm run commit`: 运行 `commitizen` 工具提交格式化的 `git commit` 注释。
 - `npm run build`: 运行 `rollup` 编译打包 TypeScript 代码，并运行 `typedoc` 工具生成文档。
 
## 关联远程分支
https://github.com/YaseminLi/git/blob/master/init.md

此项目在提交代码git commit时，可以运行 `npm run commit` 这个 `npm` 脚本来提交代码，运行后它会依次询问你几个问题，比如你这次修改的范围包括哪些、提交的描述、是否有 break change、影响了哪些 issue 等等。

至此，我们项目已经初始化完毕，接下来我们就开始编写源码实现 axios 了。

下一篇：01_base.md




