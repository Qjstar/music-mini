Page({
  data: {
    // 歌曲列表
    musicList:[],
    // 歌曲下标
    nowIndex: '',
    //当前歌曲数据
    music: {},
    // 控制播放方法
    action:{
      "method":"play"
    },
    // 
    isShow: false,
    isPlay: true,
    h: '',
    pid: '',
    //播放进度控制
    progress: 0,
    ct: '00:00',
    dt: '03:00',
    // 循环播放
    circleType: 'icon-xunhuan', 
    //歌词
    lyric: [],
    currentIndex: 0,
  },
  
  // 返回上一页面
  backTo:function(){
    wx.navigateBack()
  },

  /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 获取传过来的歌曲
      const eventChannel = this.getOpenerEventChannel()
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', data=> {
        // console.log(music)
        const musicData = data.data.musicList
        const nowIndex = data.data.nowIndex
        // 当前播放歌曲
        const music = musicData[nowIndex]
        this.setData({
            nowIndex: nowIndex,
            musicList: musicData,
            music: music,
            //获取歌词
            lyric: music.song_lyc.split("<br>")
        })
      })
      let h = wx.getSystemInfoSync().statusBarHeight
      this.setData({
        h,
        pid: options.pid || ''
      })
       //心动模式播放
      if(options.active == '1') {
        this.setData({
          circleType: 'icon-B',
        })
      }
    
  },




  play() {
    this.setData({
      isPlay: !this.data.isPlay,
    })
    if (this.data.isPlay==false) {
      this.setData({
        action:{
          "method":"pause"
        },
      })
    }else{
      this.setData({
        action:{
          "method":"play"
        },
      })
    }
    this.musicControl(this.data.isPlay)
  
  },

  //切换歌曲播放模式
  changeCircleType() {
    if(this.data.circleType == 'icon-xunhuan') {
      var circleType= 'icon-xunhuan1'
    } else if(this.data.circleType == 'icon-xunhuan1') {
      if(this.data.pid) {
        var circleType= 'icon-B'
        activeList(this.data.pid,this.data.songInfo.id).then(res => {
          this.setData({
            playList: res.data
          })
          app.globalData.index = -1
          app.playList(this.data.playList)
        })
      } else {
        var circleType= 'icon-xunhuan'
      }
    } else {
      var circleType = 'icon-xunhuan'
      getSonglist(this.data.pid).then(res => {
        const songList = res.playlist
        let ids = []
        songList.trackIds.forEach(ele => {
          ids.push(ele.id)
        })
        ids = ids.join(',')
        getSongDetail(ids).then(t => {
          const playList = t.songs
          this.setData({
            playList
          })
          app.globalData.index = -1
          app.playList(this.data.playList)
        })
      })
    }
    this.setData({
      circleType
    })
  },
  //切换歌曲
  changeSong() {
    getSongDetail(app.getSong(type)).then(res => {
      this.getSongInfo(res.songs[0])
    })
  },
  //歌曲播放函数
  async getSongInfo() {
    await this.setData({
      currentIndex: 0,
      lyric: [],
    })
  },


  // 播放列表
  openList() {
    this.setData({
      isShow: true,
      index: this.data.musicList.length
    })
    // console.log(this.data.musicList.length)
  },
  closeList() {
    this.setData({
      isShow: false
    })
  },

  
})