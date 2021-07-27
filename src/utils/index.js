/**
 * 触底事件
 * @param {HTMLElement} el 触发触底事件的目标元素
 * @param {Function} callback 触发触底事件后执行的回调函数
 */
export const onBottom = (el, callback) => {
  const scrollTop = el.scrollTop;
  const scrollHeight = el.scrollHeight;
  const offsetHeight = el.clientHeight;
  const currentHeight = scrollTop + offsetHeight;
  currentHeight >= scrollHeight && callback();
}

/**
 * 日期格式化
 * @param {Date} date 日期对象
 * @param {string} format 格式
 * 'YYYY-MM-dd hh:mm:ss ww' => '2021-01-01 14:20:45 星期五'
 * 'YYYY-MM-dd HH:mm:ss ww' => '2021-01-01 下午14:20:45 星期五'
 * 'yy-MM-dd hh:mm:ss ww' => '21-01-01 14:20:45 星期五'
 * @returns {string}
 */
export const dateFormat = function (date, format = 'YYYY-MM-dd hh:mm:ss ww') {
  const handleFormat = time => time < 10 ? `0${time}` : `${time}`;
  const year = date.getFullYear().toString();
  const month = handleFormat(date.getMonth() + 1);
  const day = handleFormat(date.getDate());
  const hour = handleFormat(date.getHours());
  const minute = handleFormat(date.getMinutes());
  const second = handleFormat(date.getSeconds());
  const week = date.getDay();
  const weekChar = ['日', '一', '二', '三', '四', '五', '六'];
  const flag = [['yy', year.slice(2)], ['YYYY', year], ['MM', month], ['dd', day], ['hh', hour], ['HH', +hour > 12 ? `下午${+hour - 12}` : `上午${hour}`], ['mm', minute], ['ss', second], ['ww', `星期${weekChar[week]}`]];
  flag.map(cur => format.includes(cur[0]) && (format = format.replaceAll(cur[0], cur[1])));
  return format;
}

// 时间格式转换
export const timeFormat = function (time, mode) {
  const starter = {
    0: () => {
      // '04:45' => 285
      return +time.split(':')[0] * 60 + +time.split(':')[1];
    },
    1: () => {
      // 285 => '04:45'
      return `${~~(time / 60) < 10 ? '0' + ~~(time / 60) : ~~(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`;
    }
  }[mode];
  return starter();
}