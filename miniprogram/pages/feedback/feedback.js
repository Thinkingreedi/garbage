let app = getApp()
Page({
  data: {
    content_max: 140,
    content: ''
  },
  bindTextarea(e) {
    this.setData({
      content: e.detail.value
    })
  },
  send() {
    if (this.data.content == '') {
      app.$util.errorToShow("反馈内容不能为空")
      return;
    }
    wx.cloud.callFunction({
      name: 'db',
      data: {
        $url: "addFeedback",
        content: this.data.content
      }
    }).then(res => {
      app.$util.successToShow("反馈成功", () => {
        app.$util.navigateBack("/pages/home/home")
      })
    })
  }
})