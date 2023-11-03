// pages/singerDetail/singerDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 当前歌手数据
        singerdata:{},
        // 歌手详情
        singerdetail:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('acceptDataFromOpenerPage', data=> {
          console.log(data)
          this.setData({
              singerdata: data
          })
        })
        // 调用渲染页面的方法
        this.getdetail()
    },
    // 页面详情数据获取
    getdetail: function(){
        // 获取id
        const id = this.data.singerdata.data.singer_id
        console.log(id)
        // 通过id做数据请求
        wx.request({
          url: 'http://localhost/music-api/singerDetail.php?SingerId='+id,
          success: (result)=> {
            //   console.log(result.data[0])
              this.setData({
                  singerdetail: result.data[0]
              })
          },
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})