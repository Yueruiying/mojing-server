
import rp from 'request-promise-native'

const TID_REGEXP = () => (/\<input\stype\=\"text\"\sname\=\"tid\"\svalue\=\"(.+)\"\>/g)

function parseTid(html) {
  var res = TID_REGEXP().exec(html)
  if ( res && res.length < 2 ) {
    throw Error('未从html中获取到tid')
  }
  return res[1]
}

const baseUrl = 'https://kan.msxiaobing.com'

const getDefaultHeaders = (service) => ({
  'Host':'kan.msxiaobing.com',
  'Origin':'https://kan.msxiaobing.com',
  'Referer':'https://kan.msxiaobing.com/V3/Portal?task=' + service,
  'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
})

export const getContext = (service) => {
  var cookiejar = rp.jar()
  return rp({
    method: 'GET',
    uri: baseUrl + '/V3/Portal?task=' + service,
    jar: cookiejar
  }).then((res) => {
    return {
      cookiejar: cookiejar,
      tid: parseTid(res),
      service: service
    }
  })
}

export const makeImageUrl = (data) => {
  return data.Host + '' +  data.Url
}

export const uploadImage = (ctx, base64) => rp({
  method: 'POST',
  uri: baseUrl + '/Api/Image/UploadBase64',
  headers: Object.assign({}, getDefaultHeaders(ctx.service)),
  jar: ctx.cookiejar,
  body: base64,
  json: false
}).then(JSON.parse)

function buildServiceBody(imgUrl) {
  var createTime = Date.now() / 1000;
  return {
    'MsgId': createTime + '123',
    'CreateTime': createTime,
    'Content[imageUrl]': imgUrl
  }
}

export const doService = (ctx, imgUrl) => rp({
  method: 'POST',
  uri: baseUrl + '/Api/ImageAnalyze/Process?service=' + ctx.service + '&tid=' + ctx.tid,
  headers: Object.assign({'content-type': 'application/x-www-form-urlencoded'}, getDefaultHeaders(ctx.service)),
  jar: ctx.cookiejar,
  form: buildServiceBody(imgUrl)
}).then(JSON.parse)