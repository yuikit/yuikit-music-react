import React, { PureComponent } from 'react'
import '../assets/scss/songlist.scss'
import { Table } from 'antd'
import { onBottom } from '../utils'

const columns = [{
  title: '',
  dataIndex: 'key',
  width: 70,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}, {
  title: '音乐标题',
  dataIndex: 'title',
  width: 352,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}, {
  title: '歌手',
  dataIndex: 'singer',
  width: 250,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}, {
  title: '专辑',
  dataIndex: 'album',
  width: 250,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}, {
  title: '时长',
  dataIndex: 'time',
  width: 70,
  render: (text, record) => record.isPlay ? <font color="red">{text}</font> : text
}]

export default class SongList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 'max-content',
    }
  }

  componentDidMount() {
    const scrollY = +this.refs.list.offsetHeight - 56;
    this.setState({ scrollY });
  }

  componentDidUpdate() {
    const index = this.props.currentIndex;
    const songListBox = document.querySelector('.ant-table-body');
    songListBox.addEventListener('scroll', this.onScroll);
    index > 13 && (songListBox.scrollTop = index * 54);
  }  

  onScroll = () => {
    onBottom(document.querySelector('.ant-table-body'), this.props.onBottom);
  }

  onDblclick = (record, index) => {
    const { currentIndex } = this.props;
    this.props.onDblclick(record, index, currentIndex);
  }

  render() {
    const { songList, loading } = this.props;
    const { scrollY: y } = this.state;
    return (
      <div className="list" ref="list">
        <Table columns={columns} dataSource={songList} pagination={false} scroll={{ y }} loading={loading} onRow={(record, index) => ({ onDoubleClick: () => { this.onDblclick(record, index) } })} />
      </div>
    )
  }
}
