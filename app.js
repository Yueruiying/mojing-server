import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import uuid from 'uuid/v4'
import * as xb from './xiaobing-node-api'
import LRU from "lru-cache"
import { isEmpty, trim, toBase64 } from './utils'

const app = express()
app.use(bodyParser.json())

const cache = new LRU({ maxAge: 1000 * 60 * 60 * 10, max: 50 })

app

.get('/getServiceToken', async (req, resp, next) => {
  var params = req.query
  if ( isEmpty(trim(params.serviceName)) ) {
    return resp.json({ status: 0, msg: 'serviceName 不能为空' })
  }
  var ctx = await xb.getContext(params.serviceName)
  var token = uuid()
  cache.set(token, ctx)
  return resp.json({ status: 1, msg: 'ok', data: token })
})

var upload = multer({ dest: 'uploads/' })

app.post('/imageAnalyze', upload.single('image'), async (req, resp, next) => {
  var params = req.query
  if ( isEmpty(trim(params.token)) ) {
    return resp.json({ status: 0, msg: 'token 不能为空' })
  }
  var ctx = cache.get(params.token)
  if (!ctx) {
    return resp.json({ status: 0, msg: 'token 不存在或已过期，请重新申请' })
  }
  var image = req.file
  if ( image ) {
    var base64 = await toBase64(image.path)
    var upRes = await xb.uploadImage(ctx, base64)
    var res = await xb.doService(ctx, xb.makeImageUrl(upRes))
    console.log('3333')
    resp.send({ status: 1, msg: 'ok', data: res.content })
  } else {
   resp.send({ status: 0, msg: '未上传图片' })
  }
})

app.listen(9102, () => {
  console.log('服务器监听成功')
})




