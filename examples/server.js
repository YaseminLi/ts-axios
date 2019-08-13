const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const bodyParser = require('body-parser')
const app = express()
const compiler = webpack(WebpackConfig)


// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/', //WebpackConfig.output.publicPath
    stats: {//想要展示的信息
        colors: true,// // `webpack --colors` 等同于
        chunks: false// 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname)) //生产环境时

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})


const router = express.Router()
router.get('/simple/get', function (req, res) {
    res.json({
        msg: `hello world`
    })
})

router.get('/base/get', function (req, res) {
    res.json(req.query)
})

router.post('/base/post', function (req, res) {
    res.json(req.body)
})

router.post('/base/buffer', function (req, res) {
    //这是？？
    let msg = []
    req.on('data', (chunk) => {
        console.log('chunk-----:');
        console.log(chunk);
        if (chunk) {
            msg.push(chunk)
        }
    })
    req.on('end', () => {
        console.log('msg-------:');
        console.log(msg);
        let buf = Buffer.concat(msg)
        console.log('buf-------:');
        console.log( buf.toJSON());
        res.json(buf.toJSON())
    })
})
app.use(router)