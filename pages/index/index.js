// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    banner: [],
    // 图标按钮
    recommendList:[{
      icon: 'icon-meirinongshi',
      text: '每日推荐',
      type: 'recommend'
    },{
      icon: 'icon-sirenFM',
      text: '私人FM',
      type: 'FM'
    },{
      icon: 'icon-remengedanjingangqu',
      text: '歌单',
      type: 'songlist'
    },{
      icon: 'icon-paihang',
      text: '排行榜',
      type: 'ranklist'
    },{
      icon: 'icon-zhuanjis',
      text: '歌手',
      type: 'singer'
    }],

    // 热门歌手
    hotSinger:[],
    // hotSinger:[{
    //   id: '001',
    //   imgUrl:'../../assets/images/music1.jpg',
    //   name:'周杰伦',
    // },
    // {
    //   id: '002',
    //   imgUrl:'../../assets/images/music2.jpg',
    //   name:'薛之谦',
    // },
    // {
    //   id: '003',
    //   imgUrl:'../../assets/images/music3.jpg',
    //   name:'林俊杰',
    // },
    // {
    //   id: '004',
    //   imgUrl:'../../assets/images/music4.jpg',
    //   name:'邓紫棋',
    // },
    // {
    //   id: '005',
    //   imgUrl:'../../assets/images/music5.jpg',
    //   name:'周深',
    // },
    // {
    //   id: '006',
    //   imgUrl:'../../assets/images/music6.jpg',
    //   name:'朴树',
    // }],
    // 热门音乐
    hotMusic:[],
    // hotMusic:[{
    //   id: '011',
    //   imgUrl:'../../assets/images/music1.jpg',
    //   name:'宝贝在干嘛',
    // },
    // {
    //   id: '012',
    //   imgUrl:'../../assets/images/music2.jpg',
    //   name:'情人',
    // },
    // {
    //   id: '013',
    //   imgUrl:'../../assets/images/music3.jpg',
    //   name:'梦游',
    // },
    // {
    //   id: '014',
    //   imgUrl:'../../assets/images/music4.jpg',
    //   name:'心墙',
    // },
    // {
    //   id: '015',
    //   imgUrl:'../../assets/images/music5.jpg',
    //   name:'Love Story',
    // },
    // {
    //   id: '016',
    //   imgUrl:'../../assets/images/music6.jpg',
    //   name:'让风告诉你',
    // }]
  },

  //获取banner
  getBanner:function(){
    //调用接口
    wx.request({
      url: 'http://localhost/music-api/slide.php',
      success: (result) => {
          // console.log(result.data);  // 用于在开发者工具中调试器检测接口是否能正确返回数据
          this.setData({
            banner: result.data
        })
      },
    });
  },
  getHotSong:function(){
    //调用接口
    wx.request({
      url: 'http://localhost/music-api/hotSong.php',
      success: (result) => {
          // console.log(result.data);  // 用于在开发者工具中调试器检测接口是否能正确返回数据
          this.setData({
            hotMusic: result.data
        })
      },
    });
  },
    //获取歌手列表
    getSinger:function(){
      //调用接口
      wx.request({
        url: 'http://localhost/music-api/singer.php',
        success: (result) => {
            // console.log(result.data);  // 用于在开发者工具中调试器检测接口是否能正确返回数据
            this.setData({
              hotSinger: result.data
          })
        },
      });
    },
  // 点击歌手跳转页面
  hotSingerLink: function(e){
    //获取当前下标
    const index = e.currentTarget.dataset.index
    // //拿到当前数据
    const singer = this.data.hotSinger
    // console.log(this.data)
    // 跳转页面
    wx.navigateTo({
      url: '/pages/singerDetail/singerDetail',
      success: function(res){
        res.eventChannel.emit('acceptDataFromOpenerPage',{data: singer[index]})
      }
    })
  },

  // 点击跳转播放页面
  playLink: function(e){
    const index = e.currentTarget.dataset.index
    const songList = this.data.hotMusic
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

  //搜索歌曲
  search: function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  onLoad() {
    this.getBanner(),
    this.getSinger(),
    this.getHotSong()
  },
 

  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  }

})
