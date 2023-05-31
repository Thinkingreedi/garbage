let app = getApp()
import {
  getLocation,
  getWalkingRoute
} from '../../util/map.js'
Page({
  onLoad(option) {
    var param = JSON.parse(option.param);
    //中心点位置
    var latitude = param.latitude
    var longitude = param.longitude
    var briefAddr = param.briefAddr
    var toiletName = param.name
    //赋值
    this.setData({
      briefAddr: briefAddr,
      toiletName: toiletName
    });
    var destination = {
      longitude: longitude,
      latitude: latitude
    }
    this.doWalkingRoute(destination)
  },
  //进行路径规划
  doWalkingRoute: function (destination) {
    getLocation()
      .then(res => {
        const {
          longitude,
          latitude
        } = res
        this.setData({
          longitude,
          latitude
        })
        this.setData({
          markers: [{
              iconPath: this.startIcon,
              id: 0,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 28,
              height: 28,
              zIndex: -1,
              anchor: {
                x: 0.5,
                y: 1
              }
            },
            {
              iconPath: this.endIcon,
              id: 1,
              latitude: destination.latitude,
              longitude: destination.longitude,
              width: 28,
              height: 28,
              zIndex: -1,
              anchor: {
                x: 0.5,
                y: 1
              }
            }
          ]

        });
        getWalkingRoute({
            longitude: res.longitude,
            latitude: res.latitude
          },
          destination
        ).then(res => {
          var ret = res;
          var coors = ret.result.routes[0].polyline,
            pl = [];
          if (ret.result.routes[0].distance) {
            this.setData({
              distance: ret.result.routes[0].distance + ' 米'
            });
          }
          if (ret.result.routes[0].duration) {
            this.setData({
              cost: parseInt(ret.result.routes[0].duration ) + ' 分钟'
            });
          }
          console.log(ret.result.routes[0].duration,ret.result.routes[0])
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({
              latitude: coors[i],
              longitude: coors[i + 1]
            })
          }

          this.setData({
            latitude: pl[0].latitude,
            longitude: pl[0].longitude,
            polyline: [{
              points: pl,
              color: "#0091ff",
              width: 6
            }]
          });


        })
      })
      .catch((e) => {

      })
  },
  doMarkertap() {

  }
})