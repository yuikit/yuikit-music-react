import React, { PureComponent } from 'react'
import Search from '../components/Search'
import Player from '../components/Player'
import SongList from '../components/SongList'
import Lyrics from '../components/Lyrics'
import { getRecommendationSong, getDefaultKeyword, search, getSongUrl } from '../request/api'

export default class Home extends PureComponent {
  state = {
    songList: [{
      key: '',
      title: '',
      singer: '',
      album: '',
      time: '',
      albumPicUrl: '',
      isPlay: false
    }],
    loading: true,
    defaultKeyword: '',
    keywords: '',
    hasMore: false,
    page: 1,
    currentSongDetail: {},
    currentIndex: -1,
    playList: [],
    playInfo: {}
  }

  componentDidMount() {
    // 获取默认搜索关键词
    getDefaultKeyword().then(res => {
      res.code === 200 && this.setState({ defaultKeyword: res.data.realkeyword });
    });

    // 获取推荐歌曲列表
    getRecommendationSong().then(res => {
      if (res.code === 200) {
        const songList = res.data.map((item, index) => {
          const singer = item.artists.map(art => art.name).join('、');
          const second = ~~(item.duration / 1000);
          const time = `${~~(second / 60) < 10 ? '0' + ~~(second / 60) : ~~(second / 60)}:${second % 60 < 10 ? '0' + second % 60 : second % 60}`;
          return {
            id: item.id,
            key: index + 1 < 10 ? `0${index + 1}` : (index + 1).toString(),
            title: item.name,
            singer,
            album: item.album.name,
            time,
            albumPicUrl: item.album.picUrl,
            isPlay: false
          }
        });
        this.setState({ songList, loading: false });
      }
    });
  }

  // 搜索
  search = keywords => {
    this.setState({
      hasMore: true,
      page: 1,
      keywords,
      songList: []
    }, () => {
      this.handleOnLoad();
    });
  }

  // 触底加载
  handleOnLoad = () => {
    const {loading, hasMore} = this.state;
    if (loading || !hasMore)  return;
    this.setState({ loading: true });
    const { keywords, page } = this.state;
    search(keywords, page).then(res => {
      if (res.code === 200) {
        const songList = JSON.parse(JSON.stringify(this.state.songList));
        const key = songList.length + 1;
        const newSongList = res.result.songs.map((item, index) => {
          const singer = item.artists.map(art => art.name).join('、');
          const second = ~~(item.duration / 1000);
          const time = `${~~(second / 60) < 10 ? '0' + ~~(second / 60) : ~~(second / 60)}:${second % 60 < 10 ? '0' + second % 60 : second % 60}`;
          return {
            id: item.id,
            key: key + index < 10 ? `0${key + index}` : (key + index).toString(),
            title: item.name,
            singer,
            album: item.album.name,
            time,
            albumPicUrl: item.album.picUrl,
            isPlay: false
          }
        });
        songList.push(...newSongList);
        this.setState({ songList, loading: false, page: page + 1, hasMore: res.result.hasMore });
      }
    });
  }

  // 双击播放
  dblToPlay = (item, index, currentIndex) => {
    getSongUrl(item.id).then(res => {
      if(res.code === 200) {
        const currentSongDetail = {
          ...item,
          url: res.data[0].url
        };
        const playList = JSON.parse(JSON.stringify(this.state.songList));
        playList[currentIndex] && (playList[currentIndex].isPlay = false);
        playList[index].isPlay = true;
        this.setState({ currentSongDetail, playList, songList: playList, currentIndex: index });
      }
    });
  }

  // 获取播放信息
  getPlayInfo = (playInfo) => {
    this.setState({ playInfo })
  }

  // 打开歌词面板
  showLyrics = () => {
    this.refs.lyrics.showLyricsBox();
  }

  // 播放/暂停
  handlePlay = () => {
    this.refs.player.changePlay();
  }

  render() {
    const { songList, loading, defaultKeyword, currentSongDetail, playList, currentIndex, playInfo } = this.state;
    return (
      <>
        <Search defaultKeyword={defaultKeyword} onSearch={this.search} />
        <div className="main">
          <SongList songList={songList} loading={loading} currentIndex={currentIndex} onBottom={this.handleOnLoad} onDblclick={this.dblToPlay} />
        </div>
        <Player ref="player" songDetail={currentSongDetail} playList={playList} currentIndex={currentIndex} changeSong={this.dblToPlay} playInfo={this.getPlayInfo} showLyrics={this.showLyrics} />
        <Lyrics ref="lyrics" playInfo={playInfo} currentSongDetail={currentSongDetail} play={this.handlePlay} />
      </>
    )
  }
}
