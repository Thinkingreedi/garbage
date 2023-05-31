let app = getApp()
Page({
  data: {
    isLogin: app.globalData.isLogin,
    userInfo: app.globalData.userInfo,
    showSettings: false,
  },
  onLoad() {
    this.setData({
      isLogin: app.globalData.isLogin,
      userInfo: app.globalData.userInfo,
      nickName: this.data.userInfo && this.data.userInfo.nickName
    })
    if ((!wx.getUserProfile && !this.data.isLogin)) {
      wx.showModal({
        title: '警告',
        content: '微信官方提供新的登录API，如果要获取用户信息，请调节基础库到2.10.4以上!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {}
      });
    }
  },
  onShow() {
    if (this.data.isLogin) {
      wx.cloud.callFunction({
        name: "db",
        data: {
          $url: "getUserInfo"
        }
      }).then(res => {
        if (res.result.code) {
          app.$db.set('userInfo', res.result.userInfo)
          this.setData({
            userInfo: res.result.userInfo,
            nickName: res.result.userInfo.nickName
          })
          app.globalData.userInfo = res.result.userInfo
        }
      })
    }
  },
  closeSettings() {
    this.setData({
      showSettings: false
    })
  },
  openAuthorizationModal() {
    this.selectComponent('#initModal').initUserInfo({
      ...this.data.userInfo
    })
    this.setData({
      showSettings: true
    })
  },
  async updatedUserInfoEvent(e) {
    let {
      avatarUrl,
      nickName
    } = e.detail
    wx.showLoading({
      title: '完善信息',
    })

    let filePath = avatarUrl
    let suffix = /\.[^\.]+$/.exec(filePath)[0];
    let {
      fileID
    } = await wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + suffix,
      filePath: filePath,
    })

    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: "setUserInfo",
        nickName: nickName,
        avatarUrl: fileID
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result.code) {
        let userInfo = app.globalData.userInfo
        Object.assign(userInfo, {
          nickName,
          avatarUrl
        })
        app.$db.set('userInfo', userInfo)
        app.globalData.userInfo = userInfo
        app.$util.reLaunch("/pages/index/index")
        wx.showToast({
          title: '完善完成！',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },
  wxGetUserInfo() {
    var that = this;
    wx[wx.getUserProfile ? 'getUserProfile' : 'getUserInfo']({
      desc: '用于完善会员资料',
      success: (e) => {
        if (e.userInfo) {
          let userInfo = e.userInfo
          wx.showLoading({
            title: '登录中',
          })
          wx.cloud.callFunction({
            name: "db",
            data: {
              $url: "login",
              userInfo: {
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                avatarUrl: userInfo.avatarUrl
              }
            }
          }).then(res => {
            if (res.result.code) {
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1500
              })
              this.loginSuccess(res.result.userInfo)
            }
          })
        } else {
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {
              if (res.confirm) {}
            }
          });
        }
      },
      fail: (err) => {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            if (res.confirm) {}
          }
        });
      }
    })
  },
  loginSuccess(userInfo) {
    app.$db.set('userInfo', userInfo)
    this.setData({
      userInfo: userInfo,
      nickName: userInfo.nickName
    })
    app.globalData.userInfo = userInfo
    app.globalData.isLogin = true
    wx.hideLoading({})
    app.$util.reLaunch("/pages/index/index")
    this.setData({
      isLogin: true
    });
  },
  goLikeList() {
    wx.navigateTo({
      url: '/pages/likeList/likeList',
    })
  },
  goWrongList() {
    wx.navigateTo({
      url: '/pages/wrongList/wrongList',
    })
  },
  goAdmin() {
    wx.navigateTo({
      url: '/pages/adminList/adminList',
    })
  },
  goIntegral() {
    wx.navigateTo({
      url: '/pages/myIntegral/myIntegral',
    })
  },
  goFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  delCache() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确定清空缓存？',
      success(res) {
        if (res.confirm) {
          app.$db.clear()
          app.globalData.userInfo = {}
          app.globalData.isLogin = false
          that.setData({
            isLogin: app.globalData.isLogin,
            userInfo: app.globalData.userInfo
          })
          console.error(app.globalData);
          app.$util.successToShow("清除缓存成功", () => {
            app.$util.reLaunch("/pages/index/index")
          })
        }
      }
    })
  },

  onShareAppMessage: function (res) {
    return {
      "title": app.globalData.appInfo.appName,
      "path": `/pages/index/index?OPENID=${this.data.userInfo.OPENID}`,
      "imageUrl": "../../static/image/share.jpg"
    }
  }
})