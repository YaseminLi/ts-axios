const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const bodyParser = require('body-parser')
const app = express()
const compiler = webpack(WebpackConfig)
const cookieParser = require('cookie-parser')
const path=require('path')
const atob=require('atob')

require('./server2')
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
app.use(cookieParser())
app.use(express.static(__dirname, {
    setHeaders(res) {
        res.cookie('XSRF-TOKEN-D', '1234abc')
    }
}))


// 上传文件的中间件
const multipart = require('connect-multiparty')
app.use(multipart({
    uploadDir: path.resolve(__dirname, 'upload-file')
}))
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})


const router = express.Router()
registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

registerConfigRouter()

registerCancelRouter()

registerMoreRouter()

app.use(router)
function registerSimpleRouter() {
    router.get('/simple/get', function (req, res) {
        res.json({
            msg: `hello world`
        })
    })
}

function registerBaseRouter() {
    router.get('/base/get', function (req, res) {
        res.json(req.query)
    })

    router.post('/base/post', function (req, res) {
        res.json(req.body)
    })

    router.post('/base/buffer', function (req, res) {
        let msg = []
        req.on('data', (chunk) => {
            if (chunk) {
                msg.push(chunk)
            }
        })
        req.on('end', () => {
            let buf = Buffer.concat(msg)
            res.json(buf.toJSON())
        })
    })
}

function registerErrorRouter() {
    router.get('/error/get', function (req, res) {
        if (Math.random() > 0.5) {
            res.json({
                msg: `hello world`
            })
        } else {
            res.status(500)
            res.end()
        }
    })

    router.get('/error/timeout', function (req, res) {
        setTimeout(() => {
            res.json({
                msg: `hello world`
            })
        }, 3000)
    })
}

function registerExtendRouter() {
    router.get('/extend/get', function (req, res) {
        res.json({
            msg: 'hello world'
        })
    })

    router.options('/extend/options', function (req, res) {
        res.end()
    })

    router.delete('/extend/delete', function (req, res) {
        res.end()
    })

    router.head('/extend/head', function (req, res) {
        res.end()
    })

    router.post('/extend/post', function (req, res) {
        res.json(req.body)
    })

    router.put('/extend/put', function (req, res) {
        res.json(req.body)
    })

    router.patch('/extend/patch', function (req, res) {
        res.json(req.body)
    })

    router.get('/extend/user', function (req, res) {
        res.json({
            code: 0,
            message: 'ok',
            result: {
                name: 'xiaoming',
                age: 18,
                sex: 'nan'
            }
        })
    })
}

function registerInterceptorRouter() {
    router.get('/interceptor/get', function (req, res) {
        res.end('hello')
    })
}

function registerConfigRouter() {
    router.post('/config/post', function (req, res) {
        res.json(req.body)
    })
}

function registerCancelRouter() {
    router.get('/cancel/get', function (req, res) {
        setTimeout(() => {
            res.json('hello')
        }, 1000)
    })

    router.post('/cancel/post', function (req, res) {
        setTimeout(() => {
            res.json(req.body)
        }, 1000)
    })
}

function registerMoreRouter() {
    router.get('/more/get', function (req, res) {
        res.json(req.cookies)
    })

    router.post('/more/upload', function (req, res) {
        console.log(req.body, req.files)
        res.end('upload success!')
    })

    router.post('/more/post', function (req, res) {
        const auth = req.headers.authorization
        const [type, credentials] = auth.split(' ')
        console.log(atob(credentials))
        const [username, password] = atob(credentials).split(':')
        if (type === 'Basic' && username === 'Yee' && password === '123456') {
            res.json(req.body)
        } else {
            res.status(401)
            res.end('UnAuthorization')
        }
    })

    router.get('/more/304', function (req, res) {
        res.status(304)
        res.end()
    })

    router.get('/more/A', function (req, res) {
        res.end('A')
    })

    router.get('/more/B', function (req, res) {
        res.end('B')
    })
}
