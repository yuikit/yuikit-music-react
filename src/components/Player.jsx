import React, { PureComponent } from 'react'
import { Slider, Tooltip, Table } from 'antd';
import '../assets/scss/player.scss'

const columns = [{
  title: '音乐标题',
  dataIndex: 'title',
  width: 150,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}, {
  title: '歌手',
  dataIndex: 'singer',
  width: 100,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}, {
  title: '时长',
  dataIndex: 'time',
  width: 50,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}]

export default class Player extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      volume: 50, // 音量
      playType: 0, // 播放方式：0顺序播放 1随机播放 2单曲循环 3列表循环
      isOpenPlayList: false, // 是否打开播放列表
      isPlay: false, // 是否为播放状态
      currentTime: '00:00',
      timer: null,
      progress: 0,
      max: 100, // 进度条最大值
    }
  }

  componentDidMount() {
    document.addEventListener('click', e => {
      e.target.id !== 'playlist' && this.setState({ isOpenPlayList: false });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.songDetail).length && nextProps.currentIndex !== this.props.currentIndex) {
      const max = +nextProps.songDetail.time.split(':')[0] * 60 + +nextProps.songDetail.time.split(':')[1];
      this.setState({ max });
      const timer = setTimeout(() => {
        clearInterval(timer);
        this.handleSongTitleAnimation();
        this.initPlay();
      }, 0);
    }
  }

  componentDidUpdate() {
    const index = this.props.currentIndex;
    index > 10 && (document.querySelectorAll('.ant-table-body')[1].scrollTop = index * 54);
  }
  

  // 初始化播放
  initPlay() {
    this.setState({ isPlay: true, progress: 0, currentTime: '00:00' }, () => {
      this.refs.audio.currentTime = 0;
      clearInterval(this.state.timer);
      this.play();
    });
  }

  // 歌曲标题滚动
  handleSongTitleAnimation = () => {
    const { titleBox, titleText } = this.refs;
    const titleBoxWidth = titleBox.offsetWidth;
    const titleTextWidth = titleText.offsetWidth;
    if (titleTextWidth > titleBoxWidth) {
      const style = document.styleSheets[1];
      [...style.rules].map((item, index) => {
        return item.type === 7 && style.deleteRule(index);
      });
      style.insertRule(`@keyframes title_move {0% {left: 0;} 100% {left: -${titleTextWidth}px}}`);
      titleText.style.animation = `title_move ${(+((titleTextWidth / titleBoxWidth).toFixed()) * 3)}s linear infinite`;
    } else {
      titleText.style = null;
    }
  }

  // 调节音量
  ChangeVolume = volume => {
    this.setState({ volume }, () => {
      this.refs.audio.volume = volume / 100;
    });
  }

  // 音量切换（静音/非静音）
  switchVolume = () => {
    const volume = this.state.volume ? 0 : 50;
    this.setState({ volume }, () => {
      this.refs.audio.volume = volume / 100;
    });
  }

  // 修改播放方式
  changePlayType = () => {
    const { playType: lplayType } = this.state;
    const playType = lplayType === 3 ? 0 : lplayType + 1;
    this.setState({ playType });
  }

  // 打开播放列表
  openPlayList = () => {
    const { isOpenPlayList } = this.state;
    this.setState({ isOpenPlayList: !isOpenPlayList });
  }

  // 切换播放/暂停状态
  changePlay = () => {
    const { isPlay } = this.state;
    this.setState({ isPlay: !isPlay }, () => {
      this.play();
    });
  }

  // 播放/暂停
  play = () => {
    const { isPlay, max, currentTime: time } = this.state;
    const audio = this.refs.audio;
    this.props.playInfo({
      currentTime: time,
      isPlay
    });
    if (isPlay) {
      let currentTime = audio.currentTime;
      currentTime = `${~~(currentTime / 60) < 10 ? '0' + ~~(currentTime / 60) : ~~(currentTime / 60)}:${(currentTime % 60).toFixed() < 10 ? '0' + (currentTime % 60).toFixed() : (currentTime % 60).toFixed()}`
      this.setState({ currentTime }, () => {
        audio.paused && audio.play();
        const timer = setInterval(() => {
          const { currentTime } = this.state;
          const progress = this.state.progress + 1;
          progress >= max && clearInterval(timer);
          let newCurTime = +currentTime.split(':')[0] * 60 + +currentTime.split(':')[1] + 1;
          newCurTime = `${~~(newCurTime / 60) < 10 ? '0' + ~~(newCurTime / 60) : ~~(newCurTime / 60)}:${newCurTime % 60 < 10 ? '0' + newCurTime % 60 : newCurTime % 60}`
          this.props.playInfo({
            currentTime: newCurTime,
            isPlay
          });
          this.setState({ progress, currentTime: newCurTime });
        }, 1000);
        this.setState({ timer });
      });
    } else {
      const { timer } = this.state;
      audio.paused || audio.pause();
      clearInterval(timer);
    }
  }

  // 修改进度
  changeProgress = progress => {
    const min = ~~(progress / 60);
    const snd = progress % 60;
    const currentTime = `${min < 10 ? '0' + min : min}:${snd < 10 ? '0' + snd : snd}`;
    this.refs.audio.currentTime = progress;
    this.setState({ progress, currentTime }, () => {
      clearInterval(this.state.timer);
      this.play();
    });
  }

  // 进度条提示格式
  tipFormatter = () => {
    return this.state.currentTime;
  }

  // 播放结束
  handleAudioEnded = () => {
    const { playType } = this.state;
    const { songDetail, playList } = this.props;
    const index = +songDetail.key - 1;
    const _this = this;
    return {
      '0': inTurn,
      '1': random,
      '2': cycle,
      '3': list,
    }[playType.toString()]();

    // 0顺序播放
    function inTurn() {
      return index === playList.length - 1
        ? (
          // eslint-disable-next-line
          _this.refs.audio.pause(),
          _this.changePlay()
        )
        : _this.props.changeSong(playList[index + 1], index + 1, index);
    }

    // 1随机播放
    function random() {
      const random = ~~(Math.random() * playList.length);
      _this.props.changeSong(playList[random], random, index);
    }

    // 2单曲循环
    function cycle() {
      _this.props.changeSong(playList[index], index, index);
    }

    // 3列表循环
    function list() {
      index === playList.length - 1
        ? _this.props.changeSong(playList[0], 0, index)
        : _this.props.changeSong(playList[index + 1], index + 1, index);
    }
  }

  // 切歌
  changeSong = (record, index) => {
    const { currentIndex } = this.props;
    this.props.changeSong(record, index, currentIndex);
  }

  // 上一曲
  lastSong = () => {
    const { playType } = this.state;
    const { songDetail, playList } = this.props;
    const index = +songDetail.key - 1;
    const _this = this;
    return {
      '0': inTurn,
      '1': random,
      '2': cycle,
      '3': list,
    }[playType.toString()]();

    // 0顺序播放
    function inTurn() {
      return index
        ? _this.props.changeSong(playList[index - 1], index - 1, index)
        : '';
    }

    // 1随机播放
    function random() {
      const random = ~~(Math.random() * playList.length);
      _this.props.changeSong(playList[random], random, index);
    }

    // 2单曲循环
    function cycle() {
      _this.props.changeSong(playList[index], index, index);
    }

    // 3列表循环
    function list() {
      index
        ? _this.props.changeSong(playList[index - 1], index - 1, index)
        : _this.props.changeSong(playList[playList.length - 1], playList.length - 1, index);
    }
  }

  // 打开歌词面板
  showLyrics = () => {
    this.props.showLyrics();
  }

  render() {
    const { songDetail, playList } = this.props;
    const { volume, playType, isOpenPlayList, isPlay, progress, currentTime, max } = this.state;
    return (
      <div className="player_box">
        <div className="album_picture">
          <img src={songDetail.albumPicUrl} style={{ display: songDetail.albumPicUrl ? 'block' : 'none' }} alt="" />
          <div className="director" onClick={this.showLyrics}>
            <i className="iconfont icon-up"></i>
          </div>
        </div>
        <div className="song_info">
          <div className="title" ref="titleBox">
            <span ref="titleText">{songDetail.title}</span>
          </div>
          <div className="artist">{songDetail.singer}</div>
        </div>

        <div className="control">
          <div className="button_group">
            <div className="control_btn" onClick={this.lastSong}>
              <i className="iconfont icon-shangyiqu"></i>
            </div>
            <div className="control_btn play_btn" onClick={this.changePlay}>
              <i className={['iconfont', isPlay ? 'icon-pause' : 'icon-bofang'].join(' ')}></i>
            </div>
            <div className="control_btn" onClick={this.handleAudioEnded}>
              <i style={{ fontSize: '23px' }} className="iconfont icon-xiayiqu"></i>
            </div>
          </div>
          <div className="progress_bar">
            <div className="begin_time">{currentTime}</div>
            <Slider value={progress} max={max} onChange={this.changeProgress} tipFormatter={this.tipFormatter} />
            <div className="end_time">{songDetail.time || '00:00'}</div>
          </div>
        </div>

        <div className="right">
          <div className="volume">
            <div className="icon" onClick={this.switchVolume}>
              <i className={['iconfont', volume ? 'icon-shengyin' : 'icon-jingyin'].join(' ')}></i>
            </div>
            <Slider value={volume} onChange={this.ChangeVolume} />
          </div>
          <Tooltip title={['顺序播放', '随机播放', '单曲循环', '列表循环'][playType]}>
            <div className="play_type" onClick={this.changePlayType}>
              <i className={['iconfont', `icon-playtype${playType}`].join(' ')}></i>
            </div>
          </Tooltip>
          <div className="playlist_btn" onClick={this.openPlayList}>
            <i id="playlist" className="iconfont icon-list"></i>
          </div>
          <div className={['playlist', isOpenPlayList ? 'show_playlist' : ''].join(' ')}>
            <Table columns={columns} dataSource={playList} showHeader={false} pagination={false} scroll={{ y: 600 }} onRow={(record, index) => ({ onClick: () => { this.changeSong(record, index) } })} />
          </div>
        </div>
        <audio ref="audio" autoPlay src={songDetail.url} onEnded={this.handleAudioEnded}></audio>
      </div>
    )
  }
}
