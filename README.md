#  垃圾识别答题云开发微信小程序
#### 前言
##### 因为项目功能太多，所以每次更新迭代不可能所以功能都测完，所以如果你发现bug可以联系我，主页有联系方式。我会尽快解决！！！！谢谢！！！

#### 项目介绍


```
小程序使用了云开发，包含文字识别垃圾类型、语音识别垃圾类型、图片识别类型、垃圾类别答题、腾讯机器人对话。
附近垃圾场定位：自动道路、断网判断
```

#### 更新内容

+ 2021-04-10更新：

  不再使用[京东人工智能平台](http://neuhub.jd.com/)提供的API，因为服务器崩溃，虽然已经修复，但是[京东云](https://www.jdcloud.com/cn/products/garbage-classification)提供的分类服务更稳定，所以更换。
  
+ 2021-05-22更新：

  优化积分答题页面、添加积分排名、答题历史等
  
+ 2021-11-06更新分支：

  京东云的垃圾分类图片识别，因为京东服务器的缘故出现识别错误，现在修改为阿里云

+ 2021-11-06更新分支：

    京东云的垃圾分类图片识别，因为京东服务器的缘故出现识别错误，现在修改为阿里云；[使用阿里云API版本](https://gitee.com/hccwh/garbage/tree/aliyun/)（也可以等待京东服务器修复）
#### 效果图

| ![](https://images.gitee.com/uploads/images/2020/1216/215439_a4ba2ae9_5004132.png)) | ![](https://images.gitee.com/uploads/images/2020/1216/215527_cecf6f42_5004132.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://images.gitee.com/uploads/images/2020/1216/215723_d719a0d2_5004132.png "1608124957661.png") | ![](https://images.gitee.com/uploads/images/2020/1216/215750_0d45fdb1_5004132.png "1608124970439.png") |
| ![](https://images.gitee.com/uploads/images/2020/1216/215808_bd75ef89_5004132.png "1608125023006.png") | ![](https://images.gitee.com/uploads/images/2020/1216/215823_4850d6f2_5004132.png "1608125043684.png") |
| ![](https://images.gitee.com/uploads/images/2021/0523/195235_067cf40a_5004132.png) | ![](https://images.gitee.com/uploads/images/2021/0523/195548_7bd057df_5004132.png) |
| ![](https://images.gitee.com/uploads/images/2021/0316/234531_4791031e_5004132.png) | ![](https://images.gitee.com/uploads/images/2020/1216/215856_e8180776_5004132.png "1608125079226.png") |
| ![](https://images.gitee.com/uploads/images/2021/0316/234433_7753d6eb_5004132.png) | ![](https://images.gitee.com/uploads/images/2020/1216/215924_4ea5f2f2_5004132.png "1608125148380.png") |
| ![](https://images.gitee.com/uploads/images/2021/0123/095349_d3c2a424_5004132.png) | ![](https://images.gitee.com/uploads/images/2021/0123/095447_7a395af6_5004132.png) |
| ![](https://images.gitee.com/uploads/images/2021/0316/234636_012c4b2b_5004132.png ) | ![](https://images.gitee.com/uploads/images/2021/0316/234735_f5466506_5004132.png) |

#### 项目技术

   第三方：百度语音转文字、京东垃圾识别、图片垃圾识别、腾讯地图、腾讯机器人

   开发技术：微信小程序原生开发


   #### 安装教程

   ##### 1. 点赞项目，要不下面就要出bug（重点）

![](https://images.gitee.com/uploads/images/2021/0222/202322_c857dc0c_5004132.png)

   ##### 2. 下载代码到本地

![](https://images.gitee.com/uploads/images/2021/0222/202348_8de57965_5004132.png "1613982499216.png")

   ##### 3. 导入项目

![](https://images.gitee.com/uploads/images/2021/0222/202421_0777da7e_5004132.png "1613982586860.png")
       
![](https://images.gitee.com/uploads/images/2021/0222/202633_7f06db53_5004132.png "1613982770161.png")
       
  + APPID不能使用测试号

   ##### 4. 点击云开发按钮，申请开通

![](https://images.gitee.com/uploads/images/2021/0222/205413_ce2a428c_5004132.jpeg "5640239-390c0e44957c64c9.jpg")
![](https://images.gitee.com/uploads/images/2021/0222/205421_c5b736da_5004132.jpeg "5640239-5990e1052ff6dea4.jpg")

![](https://images.gitee.com/uploads/images/2021/0222/205234_b699e9fb_5004132.jpeg "5640239-6feeff5a61e497ef.jpg")


   + 填写信息，随便填

   ##### 5. 开启插件
![](https://images.gitee.com/uploads/images/2021/0222/202820_3ba8daa7_5004132.png "1613983680323.png")

![](https://images.gitee.com/uploads/images/2021/0222/202844_ac0cc4ab_5004132.png "1613983715933.png")

   ##### 6. 导入云开发数据库
![](https://images.gitee.com/uploads/images/2021/0222/203100_ae510c26_5004132.png "1613983440429.png")

   + 文件名称就是表的名称

![](https://images.gitee.com/uploads/images/2021/0222/203144_8c35c60b_5004132.png "1613983479181.png")

   + 按照上面的文件名称创建对应的表

![](https://images.gitee.com/uploads/images/2021/0222/203232_8133eb8e_5004132.png "在这里输入图片标题")

   + 导入对应名称的json文件

![](https://images.gitee.com/uploads/images/2021/0222/203356_a3054f1e_5004132.png "1613983596307.png")

   + 看到数据，代表一个表导入成功，循环以上操作，导入所有的json文件

![](https://images.gitee.com/uploads/images/2021/0222/203425_55e8b137_5004132.png "1613983827606.png")



   ##### 7. 部署云开发的云函数


![](https://images.gitee.com/uploads/images/2021/0222/210559_0130d77f_5004132.png "1613983962348.png")


   + 右击


![](https://images.gitee.com/uploads/images/2021/0222/210632_3e44a665_5004132.png "1613984053690.png")


   + 点击那个都可以


![](https://images.gitee.com/uploads/images/2021/0222/210648_4da17234_5004132.png "1613984115069.png")


   + 表示成功了


![](https://images.gitee.com/uploads/images/2021/0222/210708_0b08c101_5004132.png "1613984133166.png")


   + 两个文件夹都要这样操作


![](https://images.gitee.com/uploads/images/2021/0222/210727_b3c994b3_5004132.png "1613984162583.png")


   ##### 8. 配置腾讯地图key

   + 先去申请腾讯地图https://lbs.qq.com/dev/console/user/info 的key（网上有教程）


![](https://images.gitee.com/uploads/images/2021/0222/210831_b95c54ae_5004132.png "1613984467322.png")


   + 现在可以看到页面了


![](https://images.gitee.com/uploads/images/2021/0222/210850_9e0f2686_5004132.png  "1613984486362.png")

##### 9. 配置阿里云APPCODE

   + 去申请APPCODE

     [垃圾分类文字识别](https://market.aliyun.com/products/57126001/cmapi00035673.html)

     [垃圾分类图片识别	](https://market.aliyun.com/products/57124001/cmapi00035623.html)

   ![](https://images.gitee.com/uploads/images/2021/1106/110421_ee5483ce_5004132.png)

![](https://images.gitee.com/uploads/images/2021/0222/203607_b1c4d153_5004132.png "1613984053690.png")

   + 重新部署代码

   ##### 10.大功告成
![](https://images.gitee.com/uploads/images/2021/0222/203630_e31a34f1_5004132.png "1613985010303.png")


   + 如有不懂，可联系我！如果这个项目对您有帮助，请作者喝杯咖啡吧（发放技术介绍文档）。

     

| ![作者微信](https://gitee.com/hccwh/nodeapp/raw/master/wxCode.jpg) | ![赞赏二维码](https://gitee.com/hccwh/nodeapp/raw/master/skm.jpg) |
| :------------------------------------: | :---------------------------------: |





#### 小程序二维码

###### 上线小程序查询垃圾分类功能可能无法使用，因为接口需要费用。但是京东提供了免费的次数，可以下载代码到本地测试。

   ![](https://images.gitee.com/uploads/images/2020/1216/215948_a71861d6_5004132.jpeg "gh_6bb976c9d567_258 (2).jpg")

   #### 提示
   后台管理账号密码默认为1，请用户不用胡乱改动，有什么需求可以留言！也可以加主页的联系方式！恳请点个小小的赞！

   #### 结语

   本项目可以拿来学习、毕设。商业请谨慎。（本项目素材和部分页面借鉴了码云的其他前辈们，感谢！）

   如有不懂可联系我# garbage
