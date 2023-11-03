// pages/music/music.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musicList:[]
        // musicList:[{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music1.jpg',
        // },{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music2.jpg',
        // },{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music3.jpg',
        // },{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music4.jpg',
        // },{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music5.jpg',
        // },{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music6.jpg',
        // },{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music1.jpg',
        // },{
        //     musicName: '青花瓷',
        //     name: '周杰伦-七里香',
        //     imgUrl: '../../assets/images/music2.jpg',
        // },]
    },

    getMusic:function(){
          //调用接口
      wx.request({
        url: 'http://localhost/music-api/musicList.php',
        success: (result) => {
            // console.log(result.data);  // 用于在开发者工具中调试器检测接口是否能正确返回数据
            this.setData({
                musicList: result.data
          })
        },
      });
    },
     // 点击跳转播放页面
    playLink: function(e){
        const index = e.currentTarget.dataset.index
        const songList = this.data.musicList
        // 获取歌曲id
        const musicId = songList[index].song_id
        // console.log(songList)
        wx.request({
        url: 'http://localhost/music-api/musicPlay.php?SongId='+musicId,
        success: (result) => {
            console.log(result.data[0]);  // 用于在开发者工具中调试器检测接口是否能正确返回数据   
            // 定义数据对象
            const objData = {}
            // 存储歌曲数据列表
            objData.musicList = songList
            // 存储当前播放歌曲的下标
            objData.nowIndex = index
            wx.navigateTo({
                url: '/pages/songPlay/songPlay',
                success: function(res){
                res.eventChannel.emit('acceptDataFromOpenerPage',{data: objData})
                }
            })
            this.setData({
                // hotSinger: result.data
            })
        },
        // complete:(res)=>{
        //   console.log(res.data)
        // }
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMusic()
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