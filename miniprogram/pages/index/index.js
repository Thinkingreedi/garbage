let db = wx.cloud.database()
let app = getApp()
Page({
  data: {
    isLogin: app.globalData.isLogin,
    list: [{
      src: "/static/image/cclj.png",
      type: "cclj"
    }, {
      src: "/static/image/cylj.png",
      type: "cylj"
    }, {
      src: "/static/image/glj.png",
      type: "glj"
    }, {
      src: "/static/image/khsw.png",
      type: "khsw"
    }, {
      src: "/static/image/qtlj.png",
      type: "qtlj"
    }, {
      src: "/static/image/yflj.png",
      type: "yflj"
    }, {
      src: "/static/image/yhlj.png",
      type: "yhlj"
    }],
    topNavStyle: {
      style: ''
    }
  },
  onLoad(options) {
    let shareOption = wx.getLaunchOptionsSync()
    if (shareOption.scene === 1001 || shareOption.scene === 1007) {
      let {
        OPENID
      } = options
      this.loadShareOther(OPENID)
    }
    this.setData({
      isLogin: app.globalData.isLogin
    })
  },
  loadShareOther(OPENID) {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: "shareOther",
        otherOPENID: OPENID
      }
    }).then(res => {
      let result = res.result
      if (result.code) {}
    })
  },
  onPageScroll(e) {
    let pageScrollTop = Math.floor(e.scrollTop);
    let r = pageScrollTop / 100;
    this.setData({
      topNavStyle: {
        style: `background-color: rgba(66, 185, 131,${r>=1?1:r});`
      }
    })
  },
  cardClick(e) {
    let type = e.detail.type
    wx.navigateTo({
      url: `/pages/detail/detail?type=${type}`
    })
  }
})

