let app = getApp()
Page({
  data: {
    userInfo: null,
    shareList: [],
    allAddIntegral: 0
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.loadShareUser()
  },
  loadShareUser() {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: "shareUser"
      }
    }).then(res => {
      let result = res.result
      if (result.code) {
        let shareList = result.data
        let allAddIntegral = shareList.reduce((pre, cur) => {
          pre += cur.addIntegral
          return pre
        }, 0)
        this.setData({
          shareList: shareList,
          allAddIntegral: allAddIntegral
        })
      }
    })
  },
  shareListHandle() {
    let shareList = this.data.shareList
    let userList = shareList.map(item => ({
      ...item.userInfo,
      time: item.time
    }))
    app.$util.navigateTo(`/pages/shareList/shareList?userList=${JSON.stringify(userList)}`)
  },
  goShop(){
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        "title": app.globalData.appInfo.appName,
        "path": `/pages/index/index?OPENID=${this.data.userInfo.OPENID}`,
        "imageUrl": "../../static/image/share.jpg"
      }
    }
  }
})