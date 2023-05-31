import * as db from './util/db.js';
import * as util from './util/util.js';
let userInfo = db.get("userInfo") || {}
let isLogin = JSON.stringify(userInfo) != "{}"
// var plugin = requirePlugin("chatbot");
App({
  onLaunch: function () {
    this.autoUpdate()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:"cloud1-9g18fompb922ce32"
      })
    }
  },
  onShow() {
    this.onNetworkStatusChange()
  },
  onNetworkStatusChange() {
    var that = this
    wx.getNetworkType({
      success: function (res) {
        const networkType = res.networkType
        if ('none' != networkType) {
          that.globalData.nonetwork = true
          wx.onNetworkStatusChange(function (res) {
            if (res.isConnected) {
              that.globalData.nonetwork = true
            } else {
              that.globalData.nonetwork = false
            }
          })
        } else {
          wx.onNetworkStatusChange(function (res) {
            if (res.isConnected) {
              that.globalData.nonetwork = true
            } else {
              that.globalData.nonetwork = false
            }
          })
        }
      },
    })
  },
  $db: db,
  $util: util,
  globalData: {
    nonetwork: false,
    userInfo: userInfo,
    isLogin: isLogin,

    appInfo: {
      appName: "垃圾分类帮"
    }
  },


  autoUpdate: function () {
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            success: function (res) {
              if (res.confirm) {
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加',
                  confirmText: "确定更新",
                  success: function (res) {
                    if (res.confirm) {
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager) {
    wx.showLoading();
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },


  deductionIntegral: new Map([
    //使用文字识别垃圾消耗的积分数目
    ['garbageTextSearch', 5],
    //使用图片识别垃圾消耗的积分数目
    ['garbageImageSearch', 10]
  ])

})