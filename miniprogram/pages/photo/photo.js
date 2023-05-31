let app = getApp()
Page({
  data: {
    isShow: false,
    src: "",
    isCamera: true,
    btnTxt: "拍照",
    cWidth: 0,
    cHeight: 0,
    dialogShow: false,
    garbage: null
  },
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    var that = this
    if (this.data.isCamera == false) {
      this.setData({
        isCamera: true,
        btnTxt: "拍照"
      })
      return
    }
    this.ctx.takePhoto({
      quality: 'high',
      success: async (res) => {
        let src = res.tempImagePath
        this.setData({
          src: res.tempImagePath,
          isCamera: false,
          btnTxt: "重拍"
        })
        wx.showLoading({
          title: '正在加载中',
        })
        //图片压缩
        src = await this.img_zip(res.tempImagePath)
        this.garbageImageSearch(src)
      }
    })
  },
  img_zip(img) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: img,
        success: function (res) {
          var ratio = 2;
          var canvasWidth = res.width
          var canvasHeight = res.height
          while (canvasWidth > 300 || canvasHeight > 300) {
            canvasWidth = Math.trunc(res.width / ratio)
            canvasHeight = Math.trunc(res.height / ratio)
            ratio++;
          }
          that.setData({
            cWidth: canvasWidth,
            cHeight: canvasHeight
          })

          var ctx = wx.createCanvasContext('canvas')
          ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight)
          ctx.draw(false, setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: 'canvas',
              destWidth: canvasWidth,
              destHeight: canvasHeight,
              success: function (res) {
                resolve(res.tempFilePath) //最终图片路径
              },
              fail: function (res) {
                reject(res.errMsg)
              }
            })
          }, 1000))
        }
      })
    })
  },
  garbageImageSearch(imgBase64) {
    var filePath = imgBase64;
    const cloudPath = Date.now() + filePath.match(/\.[^.]+?$/)[0]

    let devIntegral = app.deductionIntegral.get('garbageTextSearch')
    if (Number(app.globalData.userInfo.integral) < devIntegral) {
      app.$util.errorToShow("积分不足")
    }

      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
        wx.cloud.callFunction({
          name: 'api',
          data: {
            $url: "garbageImageSearch",
            imgBase64: res.fileID,
            devIntegral:devIntegral
          }
        }).then(fn_res => {
          let result = fn_res.result
          wx.hideLoading();
          if (result.ret == 200) {
            this.setData({
              dialogShow: true
            })
            let info = result.data[0].list[0]
            app.globalData.userInfo.integral -= devIntegral
            app.$db.set('userInfo', app.globalData.userInfo)
            this.setData({
              garbage: info
            })
          } else {
            wx.showToast({
              title: "未知垃圾!",
              icon: 'none',
              duration: 1500
            })
          }
        })
      },
      fail: e => {
        wx.hideLoading({})
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      }
    })
  },
  closeDialog() {
    this.setData({
      dialogShow: false
    })
  }
})