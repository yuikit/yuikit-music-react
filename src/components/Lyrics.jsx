import React, { PureComponent } from 'react'
import '../assets/scss/lyrics.scss'
import { getLyric, getComment } from '../request/api'
import { dateFormat, timeFormat } from '../utils'

export default class Lyrics extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowComment: false,
      isSHowLyricsBox: false,
      lyric: [],
      time: [],
      currentIndex: -1,
      commentList: [],
      progress: '0 999',
      currentHeight: 0,
      timer: 0,
      isPlay: false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    JSON.stringify(nextProps.playInfo) !== JSON.stringify(this.props.playInfo) && this.setState({
      currentIndex: -1,
      currentHeight: 0,
    });

    nextProps.currentSongDetail?.id && nextProps.currentSongDetail?.id !== this.props.currentSongDetail?.id && getLyric(nextProps.currentSongDetail.id).then(res => {
      if (res.code === 200) {
        const lyricInfo = res.lrc.lyric;
        const time = [];
        const lyric = lyricInfo.split('\n').filter(Boolean).map(item => {
          time.push(item.split(']')[0].substring(1));
          return item.split(']')[1];
        });
        this.setState({ time, lyric });
      }
    });

    nextProps.currentSongDetail?.id && nextProps.currentSongDetail?.id !== this.props.currentSongDetail?.id && getComment(nextProps.currentSongDetail.id).then(res => {
      if (res.code === 200) {
        this.setState({ commentList: res.hotComments.length ? res.hotComments : res.comments });
      }
    });

    this.props.playInfo?.currentTime && this.setProgress();
    console.log('nextProps.playInfo?.isPlay', nextProps.playInfo?.isPlay);
    nextProps.playInfo?.isPlay === false && this.setState({isPlay: false}, () => {
      this.setCurrentIndex();
    });
  }

  firstScreenScroll = e => {
    const { isShowComment } = this.state;
    e.nativeEvent.deltaY > 0 && !isShowComment && this.setState({ isShowComment: true });
    !document.querySelector('.comment').scrollTop && isShowComment && e.nativeEvent.deltaY < 0 && this.setState({ isShowComment: false });
  }

  showLyricsBox = () => {
    const { isSHowLyricsBox } = this.state;
    this.setState({ isSHowLyricsBox: !isSHowLyricsBox });
  }

  // 播放/暂停
  play = () => {
    this.props.play();
  }

  // 进度
  setProgress() {
    const circumference = 2 * Math.PI * 160;
    const { time } = this.props.currentSongDetail;
    const { currentTime, isPlay } = this.props.playInfo;
    const step = circumference / timeFormat(time, 0);
    const timeDisplay = ~~timeFormat(currentTime, 0);
    this.setState({ progress: `${timeDisplay * step} ${circumference}` });
    if(this.state.isPlay !== isPlay) {
      this.setCurrentIndex();
      this.setState({isPlay});
    }
  }

  // 设置当前歌词index
  setCurrentIndex() {
    const { isPlay } = this.props.playInfo;
    console.log('setCurrentIndex isPlay', isPlay);
    const { timer: localTimer, time } = this.state;
    const beginTime = +new Date();
    if (isPlay) {
      const timer = setInterval(() => {
        const { currentIndex } = this.state;
        let { currentHeight } = this.state;
        time.map((item, index) => {
          return +new Date() - beginTime >= this.timeFormat(item) && index === currentIndex + 1 && this.setState({ currentIndex: index, currentHeight: currentHeight + document.querySelector('.active')?.offsetHeight || 0 });
        });
        currentIndex === time.length - 1 && clearInterval(timer);
      }, 0);
      return this.setState({timer});
    }
    clearInterval(localTimer);
  }

  timeFormat = time => {
    const m = +time.split(':')[0];
    const s = +time.split(':')[1].split('.')[0];
    const mm = +time.split(':')[1].split('.')[1];
    return m * 60 * 1000 + s * 1000 + mm;
  }

  render() {
    const { isShowComment, lyric, commentList, isSHowLyricsBox, progress, currentIndex, currentHeight } = this.state;
    const { playInfo, currentSongDetail } = this.props;
    return (
      <div className={['lyrics_box', isSHowLyricsBox ? 'show_lyrics_box' : ''].join(' ')}>
        <div className="bg_box"></div>
        <div className="container">
          <div className="first_screen">
            <div className="left" onWheel={this.firstScreenScroll}>
              <div className={['album_container', isShowComment ? 'show_comment' : ''].join(' ')}>
                <div className={['album_box', playInfo.isPlay ? 'playing' : ''].join(' ')}>
                  <img src={currentSongDetail.albumPicUrl} alt="" />
                  <div className="mask">
                    <div className="time">
                      <div className="currentTime">{playInfo.currentTime}</div>
                      <div className="duration">{currentSongDetail.time}</div>
                    </div>
                    <div className="circle">
                      <svg width="326" height="326" viewBox="0,0,326,326">
                        <circle
                          cx="163"
                          cy="163"
                          r="159"
                          strokeWidth="4"
                          stroke="rgba(255, 206, 113, 0.2)"
                          fill="rgba(0,0,0,.2)"
                        ></circle>
                        <circle
                          cx="163"
                          cy="163"
                          r="159"
                          strokeWidth="3"
                          stroke="rgba(255, 206, 113, 1)"
                          fill="none"
                          strokeDasharray={progress}
                          transform="matrix(0,-1,1,0,0,326)"
                        ></circle>
                      </svg>
                    </div>
                    <div className="play_btn" onClick={this.play}>
                      <i className={['iconfont', playInfo.isPlay ? 'icon-pause' : 'icon-bofang'].join(' ')}></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comment">
                <div className="list">
                  {
                    commentList.map((item, index) => {
                      return (
                        <div className="item" key={index}>
                          <div className="item_left">
                            <img src={item.user.avatarUrl} alt="" />
                          </div>
                          <div className="item_right">
                            <div className="content">
                              <span className="nickname">{item.user.nickname}: </span>
                              <span>{item.content}</span>
                            </div>
                            <div className="bottom">
                              <div className="time">{dateFormat(new Date(item.time), 'YYYY年MM月dd日 hh:mm')}</div>
                              <div className="like">
                                <div className="icon">
                                  <i className="iconfont icon-zan"></i>
                                </div>
                                <div className="likecount">{item.likedCount}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="right">
              <div className="lyrics_content">
                <ul style={{ transform: currentHeight >= 350 ? `translateY(-${currentHeight - 350}px)` : '' }}>
                  {
                    lyric.map((item, index) => {
                      return <li key={index} className={currentIndex === index ? 'active' : ''}>{item}</li>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
