let app = getApp()
Page({

  data: {

  },
  bindImage: function (event) {
    var that = this
    var imagesUrls = event.currentTarget.dataset.imgsurl;
    const modal = {
      title: '授权',
      content: '需要您授权使用保存到相册服务',
      confirmText: '设置'
    }
    app.$util.setScope('scope.writePhotosAlbum',modal).then(res => {
      wx.getImageInfo({
        src: imagesUrls,
        success(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
            success() {
              app.$util.successToShow("保存图片成功")
            }
          })
        }
      })
    })
  }
})