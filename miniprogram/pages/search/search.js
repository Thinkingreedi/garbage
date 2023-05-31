const app = getApp()
// const recorderManager = wx.getRecorderManager()

// var plugin = requirePlugin("WechatSI")
// let manager = plugin.getRecordRecognitionManager()

Page({
  data: {
    history: [],
    hot: [],
    showActionsheet: false,
    groups: [{
      text: '确定',
      value: 1
    }],
    is_show: false,
    voice_show: false,
    searchKey: '',
    dialogShow: false,
    garbage: null
  },
  onLoad() {
    let that = this
    //获取历史搜索
    this.setData({
      history: app.$db.get('history') || []
    })
    this.getHot()
    // //对停止录音进行监控
    // manager.onStop = (res) => {
    //   wx.getSetting({
    //     success: (scope) => {
    //       if (scope.authSetting['scope.record'] == true) {
    //         //此时先判断是否需要发送录音
    //         if (that.data.is_clock == true) {
    //           //对录音时长进行判断，少于2s的不进行发送，并做出提示
    //           if (res.duration < 1000) {
    //             wx.showToast({
    //               title: '录音时间太短，请长按录音',
    //               icon: 'none',
    //               duration: 1000
    //             })
    //           } else {
    //             const {
    //               result
    //             } = res;
    //             that.setData({
    //               is_show: false,
    //               voice_show: false
    //             })
    //             if (result == "") {
    //               wx.showToast({
    //                 title: "未识别到语音信息!",
    //                 icon: 'none',
    //                 duration: 3000
    //               })
    //               return;
    //             }
    //             var keyword = result;
    //             keyword = keyword.replace("。", "");
    //             that.setData({
    //               searchKey: keyword
    //             })
    //             that.inputConfirm(keyword)
    //           }
    //         } else {
    //           wx.showToast({
    //             title: '录音已取消',
    //             icon: 'none',
    //             duration: 2000
    //           })
    //         }
    //       }
    //     }
    //   })
    // }

    // //监控录音异常情况
    // manager.onError = (res) => {
    //   if (res['errMsg'] != 'operateRecorder:fail recorder not start') {
    //     app.$util.setScope('scope.record', {
    //       title: '你拒绝使用录音功能，语音识别功能将无法正常使用',
    //       content: '是否重新授权使用你的录音功能',
    //       confirmText: '设置'
    //     }).then(() => {
    //       wx.showToast({
    //         title: '授权成功，请长按录音',
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }).catch((e) => {})
    //   }
    // }

  },
  openDelAction() {
    this.setData({
      showActionsheet: true
    })
  },
  closeDelAction: function () {
    this.setData({
      showActionsheet: false
    })
  },
  delHnader(e) {
    if (e.detail.value) {
      this.setData({
        history: []
      })
      app.$db.set('history', this.data.history)
    }
    this.closeDelAction()
  },
  startRecord() {
    wx.showToast({
      title: '请长按录音',
      icon: 'none',
      duration: 1000
    })
  },
  //语音识别 开始录音
  handleRecordStart(e) {
    this.setData({
      startPoint: e.touches[0], //记录触摸点的坐标信息
      is_show: true,
      is_clock: true
    })
    //录音参数
    const options = {
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'PCM'
    }
    //开启录音
    manager.start()
    // recorderManager.start(options);
    wx.showToast({
      title: '正在录音，往上滑动取消发送',
      icon: 'none',
      duration: 10000
    })
  },
  //停止录音
  handleRecordStop() {
    wx.hideToast(); //结束录音、隐藏Toast提示框
    this.setData({
      is_show: false
    })
    // recorderManager.stop() //结束录音
    manager.stop()
  },
  //滑动取消发送
  handleTouchMove: function (e) {
    //计算距离，当滑动的垂直距离大于25时，则取消发送语音
    if (this.data.startPoint.clientY - Math.abs(e.touches[e.touches.length - 1].clientY) > 35) {
      wx.showToast({
        title: "松开手指,取消发送",
        icon: "none",
        duration: 10000
      });
      this.setData({
        is_clock: false //设置为不发送语音
      })
    } else {
      wx.showToast({
        title: '正在录音，往上滑动取消发送',
        icon: 'none',
        duration: 10000
      })
      this.setData({
        is_clock: true
      })
    }
  },
  openVoice() {
    this.setData({
      voice_show: true
    })
  },
  closeVoice() {
    this.setData({
      voice_show: false
    })
  },
  inputConfirm(e) {
    let val = ''
    if (e.detail) {
      val = e.detail.value
    } else {
      val = e
    }
    let devIntegral = app.deductionIntegral.get('garbageTextSearch')
    if (Number(app.globalData.userInfo.integral) < devIntegral) {
      app.$util.errorToShow("积分不足")
    }

    wx.showLoading({
      title: '正在加载数据中.....',
    })
    wx.cloud.callFunction({
      name: 'api',
      data: {
        $url: "garbageTextSearch",
        text: val,
        devIntegral: devIntegral
      }
    }).then(res => {
      wx.hideLoading();

      let result = res.result


      if (result.ret == 200) {
        this.setData({
          dialogShow: true
        })
        let info = result.data.list[0]
        app.globalData.userInfo.integral -= devIntegral
        app.$db.set('userInfo', app.globalData.userInfo)
        this.setData({
          garbage: info
        })
      } else {
        wx.showToast({
          title: result.msg,
          icon: 'none',
          duration: 1500
        })
      }

      if (this.data.history.indexOf(val) == -1) {
        if (this.data.history.length > 10) {
          this.data.history = this.data.history.shift()
        }
        this.setData({
          history: this.data.history.concat(val)
        })
        this.addHot(val)
        app.$db.set('history', this.data.history)
      }
    })
  },
  closeDialog() {
    this.setData({
      dialogShow: false
    })
  },
  getHot() {
    wx.cloud.callFunction({
      name: 'db',
      data: {
        $url: "getHot"
      }
    }).then(res => {
      let data = res.result.data
      let hot = data && data.map(item => item.hot_text)
      this.setData({
        hot: hot || []
      })
    })
  },
  addHot(hot_text) {
    wx.cloud.callFunction({
      name: 'db',
      data: {
        $url: "addHot",
        hot_text: hot_text
      }
    })
  },
  tagClick(e) {
    this.setData({
      searchKey: e.currentTarget.dataset.tag
    })
  }
})