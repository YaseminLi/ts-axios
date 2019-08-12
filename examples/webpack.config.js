const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   * fs.readdirSync(__dirname):读取examples路径下的文件名，输出数组形式
   * fs.statSync().isDirectory():是否是文件夹路径
   * fs.existSync():文件是否存在，已经废弃，用stat,access代替
   */
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir) //  每个子目录的路径：examples/simple
        const entry = path.join(fullDir, 'app.ts') //  每个子目录中入口文件的路径：examples/simple/app.ts
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }

        return entries
    }, {}),
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js', //name为模块名称
        publicPath: '/__build__/' // // 相对于服务(server-relative)??
    },
    module: {
        rules: [
            {
                test: /\.ts$/,//匹配文件路径的正则表达式，$表示结尾
                enforce: 'pre', // 指定为前置类型,先执行，所有的 loader 按照前置 -> 行 内 -> 普通 -> 后置 的顺序执行,这里为什么前置呢？？
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']//引入模块时不用带扩展名
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),////在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面
        new webpack.NoEmitOnErrorsPlugin()//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    ]
}