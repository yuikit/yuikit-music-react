(this["webpackJsonpyuikit-music-react"]=this["webpackJsonpyuikit-music-react"]||[]).push([[0],{124:function(e,t,n){},126:function(e,t,n){},201:function(e,t,n){},202:function(e,t,n){},223:function(e,t,n){},224:function(e,t,n){"use strict";n.r(t);var i=n(25),s=n.n(i),a=n(87),r=n(76),c=n(32),o=n(33),l=n(37),u=n(36),d=n(0),h=(n(124),n(6)),p=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,s=new Array(i),a=0;a<i;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).state={isOpenInput:!1,keywords:""},e.search=function(){var t=e.refs.input;if(0===t.offsetWidth)return e.setState({isOpenInput:!0}),t.focus();e.props.onSearch(e.state.keywords||e.props.defaultKeyword)},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.isOpenInput,i=t.keywords,s=this.props.defaultKeyword;return Object(h.jsx)("div",{className:"search_box",children:Object(h.jsxs)("div",{className:"search_border",children:[Object(h.jsx)("input",{type:"text",placeholder:s,value:i,ref:"input",className:n?"show_input":"",onChange:function(t){return e.setState({keywords:t.currentTarget.value})},onKeyDown:function(t){return 13===t.keyCode&&e.search()}}),Object(h.jsx)("i",{className:"iconfont icon-sousuo",onClick:this.search})]})})}}]),n}(d.PureComponent),m=n(57),f=n(227),j=n(53),y=n(226),v=(n(126),[{title:"\u97f3\u4e50\u6807\u9898",dataIndex:"title",width:150,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}},{title:"\u6b4c\u624b",dataIndex:"singer",width:100,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}},{title:"\u65f6\u957f",dataIndex:"time",width:50,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}}]),g=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleSongTitleAnimation=function(){var e=i.refs,t=e.titleBox,n=e.titleText,s=t.offsetWidth,a=n.offsetWidth;if(a>s){var c=document.styleSheets[1];Object(r.a)(c.rules).map((function(e,t){return 7===e.type&&c.deleteRule(t)})),c.insertRule("@keyframes title_move {0% {left: 0;} 100% {left: -".concat(a,"px}}")),n.style.animation="title_move ".concat(3*+(a/s).toFixed(),"s linear infinite")}else n.style=null},i.ChangeVolume=function(e){i.setState({volume:e},(function(){i.refs.audio.volume=e/100}))},i.switchVolume=function(){var e=i.state.volume?0:50;i.setState({volume:e},(function(){i.refs.audio.volume=e/100}))},i.changePlayType=function(){var e=i.state.playType,t=3===e?0:e+1;i.setState({playType:t})},i.openPlayList=function(){var e=i.state.isOpenPlayList;i.setState({isOpenPlayList:!e})},i.changePlay=function(){var e=i.state.isPlay;i.setState({isPlay:!e},(function(){i.play()}))},i.play=function(){var e=i.state,t=e.isPlay,n=e.max,s=e.currentTime,a=i.refs.audio;if(i.props.playInfo({currentTime:s,isPlay:t}),t){var r=a.currentTime;r="".concat(~~(r/60)<10?"0"+~~(r/60):~~(r/60),":").concat((r%60).toFixed()<10?"0"+(r%60).toFixed():(r%60).toFixed()),i.setState({currentTime:r},(function(){a.paused&&a.play();var e=setInterval((function(){var s=i.state.currentTime,a=i.state.progress+1;a>=n&&clearInterval(e);var r=60*+s.split(":")[0]+ +s.split(":")[1]+1;r="".concat(~~(r/60)<10?"0"+~~(r/60):~~(r/60),":").concat(r%60<10?"0"+r%60:r%60),i.props.playInfo({currentTime:r,isPlay:t}),i.setState({progress:a,currentTime:r})}),1e3);i.setState({timer:e})}))}else{var c=i.state.timer;a.paused||a.pause(),clearInterval(c)}},i.changeProgress=function(e){var t=~~(e/60),n=e%60,s="".concat(t<10?"0"+t:t,":").concat(n<10?"0"+n:n);i.refs.audio.currentTime=e,i.setState({progress:e,currentTime:s},(function(){clearInterval(i.state.timer),i.play()}))},i.tipFormatter=function(){return i.state.currentTime},i.handleAudioEnded=function(){var e=i.state.playType,t=i.props,n=t.songDetail,s=t.playList,a=+n.key-1,r=Object(m.a)(i);return{0:function(){return a===s.length-1?(r.refs.audio.pause(),r.changePlay()):r.props.changeSong(s[a+1],a+1,a)},1:function(){var e=~~(Math.random()*s.length);r.props.changeSong(s[e],e,a)},2:function(){r.props.changeSong(s[a],a,a)},3:function(){a===s.length-1?r.props.changeSong(s[0],0,a):r.props.changeSong(s[a+1],a+1,a)}}[e.toString()]()},i.changeSong=function(e,t){var n=i.props.currentIndex;i.props.changeSong(e,t,n)},i.lastSong=function(){var e=i.state.playType,t=i.props,n=t.songDetail,s=t.playList,a=+n.key-1,r=Object(m.a)(i);return{0:function(){return a?r.props.changeSong(s[a-1],a-1,a):""},1:function(){var e=~~(Math.random()*s.length);r.props.changeSong(s[e],e,a)},2:function(){r.props.changeSong(s[a],a,a)},3:function(){a?r.props.changeSong(s[a-1],a-1,a):r.props.changeSong(s[s.length-1],s.length-1,a)}}[e.toString()]()},i.showLyrics=function(){i.props.showLyrics()},i.state={volume:50,playType:0,isOpenPlayList:!1,isPlay:!1,currentTime:"00:00",timer:null,progress:0,max:100},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("click",(function(t){"playlist"!==t.target.id&&e.setState({isOpenPlayList:!1})}))}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this;if(Object.keys(e.songDetail).length&&e.currentIndex!==this.props.currentIndex){var n=60*+e.songDetail.time.split(":")[0]+ +e.songDetail.time.split(":")[1];this.setState({max:n});var i=setTimeout((function(){clearInterval(i),t.handleSongTitleAnimation(),t.initPlay()}),0)}}},{key:"componentDidUpdate",value:function(){var e=this.props.currentIndex;e>10&&(document.querySelectorAll(".ant-table-body")[1].scrollTop=54*e)}},{key:"initPlay",value:function(){var e=this;this.setState({isPlay:!0,progress:0,currentTime:"00:00"},(function(){e.refs.audio.currentTime=0,clearInterval(e.state.timer),e.play()}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.songDetail,i=t.playList,s=this.state,a=s.volume,r=s.playType,c=s.isOpenPlayList,o=s.isPlay,l=s.progress,u=s.currentTime,d=s.max;return Object(h.jsxs)("div",{className:"player_box",children:[Object(h.jsxs)("div",{className:"album_picture",children:[Object(h.jsx)("img",{src:n.albumPicUrl,style:{display:n.albumPicUrl?"block":"none"},alt:""}),Object(h.jsx)("div",{className:"director",onClick:this.showLyrics,children:Object(h.jsx)("i",{className:"iconfont icon-up"})})]}),Object(h.jsxs)("div",{className:"song_info",children:[Object(h.jsx)("div",{className:"title",ref:"titleBox",children:Object(h.jsx)("span",{ref:"titleText",children:n.title})}),Object(h.jsx)("div",{className:"artist",children:n.singer})]}),Object(h.jsxs)("div",{className:"control",children:[Object(h.jsxs)("div",{className:"button_group",children:[Object(h.jsx)("div",{className:"control_btn",onClick:this.lastSong,children:Object(h.jsx)("i",{className:"iconfont icon-shangyiqu"})}),Object(h.jsx)("div",{className:"control_btn play_btn",onClick:this.changePlay,children:Object(h.jsx)("i",{className:["iconfont",o?"icon-pause":"icon-bofang"].join(" ")})}),Object(h.jsx)("div",{className:"control_btn",onClick:this.handleAudioEnded,children:Object(h.jsx)("i",{style:{fontSize:"23px"},className:"iconfont icon-xiayiqu"})})]}),Object(h.jsxs)("div",{className:"progress_bar",children:[Object(h.jsx)("div",{className:"begin_time",children:u}),Object(h.jsx)(f.a,{value:l,max:d,onChange:this.changeProgress,tipFormatter:this.tipFormatter}),Object(h.jsx)("div",{className:"end_time",children:n.time||"00:00"})]})]}),Object(h.jsxs)("div",{className:"right",children:[Object(h.jsxs)("div",{className:"volume",children:[Object(h.jsx)("div",{className:"icon",onClick:this.switchVolume,children:Object(h.jsx)("i",{className:["iconfont",a?"icon-shengyin":"icon-jingyin"].join(" ")})}),Object(h.jsx)(f.a,{value:a,onChange:this.ChangeVolume})]}),Object(h.jsx)(j.a,{title:["\u987a\u5e8f\u64ad\u653e","\u968f\u673a\u64ad\u653e","\u5355\u66f2\u5faa\u73af","\u5217\u8868\u5faa\u73af"][r],children:Object(h.jsx)("div",{className:"play_type",onClick:this.changePlayType,children:Object(h.jsx)("i",{className:["iconfont","icon-playtype".concat(r)].join(" ")})})}),Object(h.jsx)("div",{className:"playlist_btn",onClick:this.openPlayList,children:Object(h.jsx)("i",{id:"playlist",className:"iconfont icon-list"})}),Object(h.jsx)("div",{className:["playlist",c?"show_playlist":""].join(" "),children:Object(h.jsx)(y.a,{columns:v,dataSource:i,showHeader:!1,pagination:!1,scroll:{y:600},onRow:function(t,n){return{onClick:function(){e.changeSong(t,n)}}}})})]}),Object(h.jsx)("audio",{ref:"audio",autoPlay:!0,src:n.url,onEnded:this.handleAudioEnded})]})}}]),n}(d.PureComponent),b=(n(201),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-dd hh:mm:ss ww",n=function(e){return e<10?"0".concat(e):"".concat(e)},i=e.getFullYear().toString(),s=n(e.getMonth()+1),a=n(e.getDate()),r=n(e.getHours()),c=n(e.getMinutes()),o=n(e.getSeconds()),l=e.getDay(),u=["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],d=[["yy",i.slice(2)],["YYYY",i],["MM",s],["dd",a],["hh",r],["HH",+r>12?"\u4e0b\u5348".concat(+r-12):"\u4e0a\u5348".concat(r)],["mm",c],["ss",o],["ww","\u661f\u671f".concat(u[l])]];return d.map((function(e){return t.includes(e[0])&&(t=t.replaceAll(e[0],e[1]))})),t}),x=function(e,t){return(0,{0:function(){return 60*+e.split(":")[0]+ +e.split(":")[1]},1:function(){return"".concat(~~(e/60)<10?"0"+~~(e/60):~~(e/60),":").concat(e%60<10?"0"+e%60:e%60)}}[t])()},O=[{title:"",dataIndex:"key",width:70,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}},{title:"\u97f3\u4e50\u6807\u9898",dataIndex:"title",width:352,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}},{title:"\u6b4c\u624b",dataIndex:"singer",width:250,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}},{title:"\u4e13\u8f91",dataIndex:"album",width:250,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}},{title:"\u65f6\u957f",dataIndex:"time",width:70,render:function(e,t){return t.isPlay?Object(h.jsx)("font",{color:"red",children:e}):e}}],S=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).onScroll=function(){!function(e,t){var n=e.scrollTop,i=e.scrollHeight;n+e.clientHeight>=i&&t()}(document.querySelector(".ant-table-body"),i.props.onBottom)},i.onDblclick=function(e,t){var n=i.props.currentIndex;i.props.onDblclick(e,t,n)},i.state={scrollY:"max-content"},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=+this.refs.list.offsetHeight-56;this.setState({scrollY:e})}},{key:"componentDidUpdate",value:function(){var e=this.props.currentIndex,t=document.querySelector(".ant-table-body");t.addEventListener("scroll",this.onScroll),e>13&&(t.scrollTop=54*e)}},{key:"render",value:function(){var e=this,t=this.props,n=t.songList,i=t.loading,s=this.state.scrollY;return Object(h.jsx)("div",{className:"list",ref:"list",children:Object(h.jsx)(y.a,{columns:O,dataSource:n,pagination:!1,scroll:{y:s},loading:i,onRow:function(t,n){return{onDoubleClick:function(){e.onDblclick(t,n)}}}})})}}]),n}(d.PureComponent),P=(n(202),n(114)),N=n.n(P).a.create({baseURL:"http://music.eleuu.com",timeout:5e3});N.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),N.interceptors.response.use((function(e){return 200===e.status?e.data:e}),(function(e){return Promise.reject(e)}));var k=N,w=function(e,t){return k.get("/search?keywords=".concat(e,"&offset=").concat(t))},I=function(e){return k.get("/song/url?id=".concat(e))},L=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).firstScreenScroll=function(e){var t=i.state.isShowComment;e.nativeEvent.deltaY>0&&!t&&i.setState({isShowComment:!0}),!document.querySelector(".comment").scrollTop&&t&&e.nativeEvent.deltaY<0&&i.setState({isShowComment:!1})},i.showLyricsBox=function(){var e=i.state.isSHowLyricsBox;i.setState({isSHowLyricsBox:!e})},i.play=function(){i.props.play()},i.timeFormat=function(e){return 60*+e.split(":")[0]*1e3+1e3*+e.split(":")[1].split(".")[0]+ +e.split(":")[1].split(".")[1]},i.state={isShowComment:!1,isSHowLyricsBox:!1,lyric:[],time:[],currentIndex:-1,commentList:[],progress:"0 999",currentHeight:0,timer:0,isPlay:!1},i}return Object(o.a)(n,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t,n,i,s,a,r,c,o,l,u,d=this;JSON.stringify(e.playInfo)!==JSON.stringify(this.props.playInfo)&&this.setState({currentIndex:-1,currentHeight:0}),(null===(t=e.currentSongDetail)||void 0===t?void 0:t.id)&&(null===(n=e.currentSongDetail)||void 0===n?void 0:n.id)!==(null===(i=this.props.currentSongDetail)||void 0===i?void 0:i.id)&&(u=e.currentSongDetail.id,k.get("/lyric?id=".concat(u))).then((function(e){if(200===e.code){var t=e.lrc.lyric,n=[],i=t.split("\n").filter(Boolean).map((function(e){return n.push(e.split("]")[0].substring(1)),e.split("]")[1]}));d.setState({time:n,lyric:i})}})),(null===(s=e.currentSongDetail)||void 0===s?void 0:s.id)&&(null===(a=e.currentSongDetail)||void 0===a?void 0:a.id)!==(null===(r=this.props.currentSongDetail)||void 0===r?void 0:r.id)&&function(e){return k.get("/comment/music?id=".concat(e))}(e.currentSongDetail.id).then((function(e){200===e.code&&d.setState({commentList:e.hotComments.length?e.hotComments:e.comments})})),(null===(c=this.props.playInfo)||void 0===c?void 0:c.currentTime)&&this.setProgress(),console.log("nextProps.playInfo?.isPlay",null===(o=e.playInfo)||void 0===o?void 0:o.isPlay),!1===(null===(l=e.playInfo)||void 0===l?void 0:l.isPlay)&&this.setState({isPlay:!1},(function(){d.setCurrentIndex()}))}},{key:"setProgress",value:function(){var e=2*Math.PI*160,t=this.props.currentSongDetail.time,n=this.props.playInfo,i=n.currentTime,s=n.isPlay,a=e/x(t,0),r=~~x(i,0);this.setState({progress:"".concat(r*a," ").concat(e)}),this.state.isPlay!==s&&(this.setCurrentIndex(),this.setState({isPlay:s}))}},{key:"setCurrentIndex",value:function(){var e=this,t=this.props.playInfo.isPlay;console.log("setCurrentIndex isPlay",t);var n=this.state,i=n.timer,s=n.time,a=+new Date;if(t){var r=setInterval((function(){var t=e.state.currentIndex,n=e.state.currentHeight;s.map((function(i,s){var r;return+new Date-a>=e.timeFormat(i)&&s===t+1&&e.setState({currentIndex:s,currentHeight:n+(null===(r=document.querySelector(".active"))||void 0===r?void 0:r.offsetHeight)||0})})),t===s.length-1&&clearInterval(r)}),0);return this.setState({timer:r})}clearInterval(i)}},{key:"render",value:function(){var e=this.state,t=e.isShowComment,n=e.lyric,i=e.commentList,s=e.isSHowLyricsBox,a=e.progress,r=e.currentIndex,c=e.currentHeight,o=this.props,l=o.playInfo,u=o.currentSongDetail;return Object(h.jsxs)("div",{className:["lyrics_box",s?"show_lyrics_box":""].join(" "),children:[Object(h.jsx)("div",{className:"bg_box"}),Object(h.jsx)("div",{className:"container",children:Object(h.jsxs)("div",{className:"first_screen",children:[Object(h.jsxs)("div",{className:"left",onWheel:this.firstScreenScroll,children:[Object(h.jsx)("div",{className:["album_container",t?"show_comment":""].join(" "),children:Object(h.jsxs)("div",{className:["album_box",l.isPlay?"playing":""].join(" "),children:[Object(h.jsx)("img",{src:u.albumPicUrl,alt:""}),Object(h.jsxs)("div",{className:"mask",children:[Object(h.jsxs)("div",{className:"time",children:[Object(h.jsx)("div",{className:"currentTime",children:l.currentTime}),Object(h.jsx)("div",{className:"duration",children:u.time})]}),Object(h.jsx)("div",{className:"circle",children:Object(h.jsxs)("svg",{width:"326",height:"326",viewBox:"0,0,326,326",children:[Object(h.jsx)("circle",{cx:"163",cy:"163",r:"159",strokeWidth:"4",stroke:"rgba(255, 206, 113, 0.2)",fill:"rgba(0,0,0,.2)"}),Object(h.jsx)("circle",{cx:"163",cy:"163",r:"159",strokeWidth:"3",stroke:"rgba(255, 206, 113, 1)",fill:"none",strokeDasharray:a,transform:"matrix(0,-1,1,0,0,326)"})]})}),Object(h.jsx)("div",{className:"play_btn",onClick:this.play,children:Object(h.jsx)("i",{className:["iconfont",l.isPlay?"icon-pause":"icon-bofang"].join(" ")})})]})]})}),Object(h.jsx)("div",{className:"comment",children:Object(h.jsx)("div",{className:"list",children:i.map((function(e,t){return Object(h.jsxs)("div",{className:"item",children:[Object(h.jsx)("div",{className:"item_left",children:Object(h.jsx)("img",{src:e.user.avatarUrl,alt:""})}),Object(h.jsxs)("div",{className:"item_right",children:[Object(h.jsxs)("div",{className:"content",children:[Object(h.jsxs)("span",{className:"nickname",children:[e.user.nickname,": "]}),Object(h.jsx)("span",{children:e.content})]}),Object(h.jsxs)("div",{className:"bottom",children:[Object(h.jsx)("div",{className:"time",children:b(new Date(e.time),"YYYY\u5e74MM\u6708dd\u65e5 hh:mm")}),Object(h.jsxs)("div",{className:"like",children:[Object(h.jsx)("div",{className:"icon",children:Object(h.jsx)("i",{className:"iconfont icon-zan"})}),Object(h.jsx)("div",{className:"likecount",children:e.likedCount})]})]})]})]},t)}))})})]}),Object(h.jsx)("div",{className:"right",children:Object(h.jsx)("div",{className:"lyrics_content",children:Object(h.jsx)("ul",{style:{transform:c>=350?"translateY(-".concat(c-350,"px)"):""},children:n.map((function(e,t){return Object(h.jsx)("li",{className:r===t?"active":"",children:e},t)}))})})})]})})]})}}]),n}(d.PureComponent),T=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={songList:[{key:"",title:"",singer:"",album:"",time:"",albumPicUrl:"",isPlay:!1}],loading:!0,defaultKeyword:"",keywords:"",hasMore:!1,page:1,currentSongDetail:{},currentIndex:-1,playList:[],playInfo:{}},e.search=function(t){e.setState({hasMore:!0,page:1,keywords:t,songList:[]},(function(){e.handleOnLoad()}))},e.handleOnLoad=function(){var t=e.state,n=t.loading,i=t.hasMore;if(!n&&i){e.setState({loading:!0});var s=e.state,a=s.keywords,c=s.page;w(a,c).then((function(t){if(200===t.code){var n=JSON.parse(JSON.stringify(e.state.songList)),i=n.length+1,s=t.result.songs.map((function(e,t){var n=e.artists.map((function(e){return e.name})).join("\u3001"),s=~~(e.duration/1e3),a="".concat(~~(s/60)<10?"0"+~~(s/60):~~(s/60),":").concat(s%60<10?"0"+s%60:s%60);return{id:e.id,key:i+t<10?"0".concat(i+t):(i+t).toString(),title:e.name,singer:n,album:e.album.name,time:a,albumPicUrl:e.album.picUrl,isPlay:!1}}));n.push.apply(n,Object(r.a)(s)),e.setState({songList:n,loading:!1,page:c+1,hasMore:t.result.hasMore})}}))}},e.dblToPlay=function(t,n,i){I(t.id).then((function(s){if(200===s.code){var r=Object(a.a)(Object(a.a)({},t),{},{url:s.data[0].url}),c=JSON.parse(JSON.stringify(e.state.songList));c[i]&&(c[i].isPlay=!1),c[n].isPlay=!0,e.setState({currentSongDetail:r,playList:c,songList:c,currentIndex:n})}}))},e.getPlayInfo=function(t){e.setState({playInfo:t})},e.showLyrics=function(){e.refs.lyrics.showLyricsBox()},e.handlePlay=function(){e.refs.player.changePlay()},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;k.get("/search/default").then((function(t){200===t.code&&e.setState({defaultKeyword:t.data.realkeyword})})),k.get("/top/song?type=0").then((function(t){if(200===t.code){var n=t.data.map((function(e,t){var n=e.artists.map((function(e){return e.name})).join("\u3001"),i=~~(e.duration/1e3),s="".concat(~~(i/60)<10?"0"+~~(i/60):~~(i/60),":").concat(i%60<10?"0"+i%60:i%60);return{id:e.id,key:t+1<10?"0".concat(t+1):(t+1).toString(),title:e.name,singer:n,album:e.album.name,time:s,albumPicUrl:e.album.picUrl,isPlay:!1}}));e.setState({songList:n,loading:!1})}}))}},{key:"render",value:function(){var e=this.state,t=e.songList,n=e.loading,i=e.defaultKeyword,s=e.currentSongDetail,a=e.playList,r=e.currentIndex,c=e.playInfo;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(p,{defaultKeyword:i,onSearch:this.search}),Object(h.jsx)("div",{className:"main",children:Object(h.jsx)(S,{songList:t,loading:n,currentIndex:r,onBottom:this.handleOnLoad,onDblclick:this.dblToPlay})}),Object(h.jsx)(g,{ref:"player",songDetail:s,playList:a,currentIndex:r,changeSong:this.dblToPlay,playInfo:this.getPlayInfo,showLyrics:this.showLyrics}),Object(h.jsx)(L,{ref:"lyrics",playInfo:c,currentSongDetail:s,play:this.handlePlay})]})}}]),n}(d.PureComponent);n(221),n(222),n(223);s.a.render(Object(h.jsx)(T,{}),document.querySelector("#root"))}},[[224,1,2]]]);
//# sourceMappingURL=main.7cbf4c6c.chunk.js.map