Page({
  data: {
    userList: []
  },
  onLoad(options) {
    let {
      userList = "[]"
    } = options
    this.setData({
      userList: JSON.parse(userList)
    })
    console.log(this.data.userList)
  }
})