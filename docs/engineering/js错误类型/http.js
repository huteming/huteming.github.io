const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const fs = require('fs')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World'
})

router.get('/json', (ctx) => {
  ctx.body = [1, 2, 3]
})

router.get('/html', (ctx) => {
  ctx.set('Content-Type', 'text/html')
  ctx.body = fs.readFileSync('index.html')
})

router.get('/js', (ctx) => {
  ctx.set('Content-Type', 'text/javascript')
  ctx.body = fs.readFileSync('test.js')
})

router.get('/500', (ctx) => {
  ctx.status = 500
  ctx.body = 'error'
})

app.use(cors()).use(router.routes()).use(router.allowedMethods())

app.listen(8000)
