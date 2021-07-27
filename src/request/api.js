import request from './index'
// import qs from 'qs'

// 推荐音乐
export const getRecommendationSong = () => request.get('/top/song?type=0');

// 默认搜索关键词
export const getDefaultKeyword = () => request.get('/search/default');

// 搜索建议
export const getSearchSuggest = keywords => request.get(`/search/suggest?keywords=${keywords}`);

// 搜索
export const search = (keywords, page) => request.get(`/search?keywords=${keywords}&offset=${page}`);

// 获取歌词
export const getLyric = id => request.get(`/lyric?id=${id}`);

// 获取歌曲详情
export const getSongDetail = id => request.get(`/song/detail?ids=${id}`);

// 获取音乐 url
export const getSongUrl = id => request.get(`/song/url?id=${id}`);

// 获取歌曲评论
export const getComment = id => request.get(`/comment/music?id=${id}`);