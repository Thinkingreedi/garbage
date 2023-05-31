let app = getApp()
Component({

  properties: {
    show: {
      type: Boolean,
      value: true
    }
  },

  data: {
    userInfo: null
  },


  methods: {
    initUserInfo(event) {
      this.setData({
        userInfo: {
          avatarUrl: event.avatarUrl || "",
          nickName: event.nickName || ""
        }
      })
    },
    chooseAvatarEvent(e) {
      this.setData({
        "userInfo.avatarUrl": e.detail.avatarUrl
      })
    },
    submitUserInfo(event) {
      let {
        nickName
      } = event.detail.value
      this.setData({
        "userInfo.nickName": nickName
      })
      if (!this.data.userInfo.avatarUrl || !this.data.userInfo.nickName) {
        return app.$util.errorToShow("请选择头像和输入用户信息")
      }
      this.triggerEvent('updated', {
        ...this.data.userInfo
      })
    },
    closeModal() {
      this.triggerEvent('close')
    }
  }
})