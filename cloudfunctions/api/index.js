// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');
const axios = require('axios');
var urlencode = require('urlencode');
cloud.init({
  env: "cloud1-9g18fompb922ce32"
})
let db = cloud.database()
const _ = db.command

let aliyunConfig = {
  APPCODE: ''
}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    APPID,
    OPENID
  } = wxContext
  const app = new TcbRouter({
    event
  })


  //通过图片进行垃圾分类查询的能力
  app.router('garbageImageSearch', async (ctx, next) => {
    let {
      imgBase64,
      devIntegral
    } = event

    let user = db.collection('user')
    let {
      total
    } = await user.where({
      OPENID: OPENID,
      integral: _.gte(devIntegral)
    }).count()
    if (!total) {
      ctx.body = {
        code: 0,
        msg: "积分不足"
      }
      return
    }

    await user.where({
      OPENID: OPENID,
      integral: _.gte(devIntegral)
    }).update({
      data: {
        integral: _.inc(-Number(devIntegral))
      }
    })

    const {
      fileList
    } = await cloud.getTempFileURL({
      fileList: [imgBase64]
    })
    let tempFileURL = fileList[0].tempFileURL
    ctx.body = axios.post(`http://recover.market.alicloudapi.com/recover`, `img=${tempFileURL}`, {
      headers: {
        "Authorization": `APPCODE ${aliyunConfig.APPCODE}`
      }
    }).then(res => {
      cloud.deleteFile({
        fileList: [imgBase64]
      })
      return res.data
    })

  });


  app.router('garbageTextSearch', async (ctx, next) => {
    let {
      text,
      devIntegral
    } = event

    let user = db.collection('user')
    let {
      total
    } = await user.where({
      OPENID: OPENID,
      integral: _.gte(devIntegral)
    }).count()
    if (!total) {
      ctx.body = {
        code: 0,
        msg: "积分不足"
      }
      return
    }

    await user.where({
      OPENID: OPENID,
      integral: _.gte(devIntegral)
    }).update({
      data: {
        integral: _.inc(-Number(devIntegral))
      }
    })

    ctx.body = axios.get(`http://recover2.market.alicloudapi.com/recover_word?name=${encodeURI(text)}`, {
      headers: {
        Authorization: `APPCODE ${aliyunConfig.APPCODE}`
      }
    }).then(res => {
      return res.data
    })
  })


  //获取用户openID
  app.router('openId', async (ctx, next) => {
    ctx.body = {
      openId: OPENID
    }
  })
  return app.serve()
}