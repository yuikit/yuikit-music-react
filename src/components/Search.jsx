import React, { PureComponent } from 'react'
import '../assets/scss/search.scss'

export default class Search extends PureComponent {
  state = {
    isOpenInput: false,
    keywords: ''
  }

  search = () => {
    const input = this.refs.input
    if (input.offsetWidth === 0) {
      this.setState({ isOpenInput: true });
      return input.focus();
    }
    this.props.onSearch(this.state.keywords || this.props.defaultKeyword);
  }

  render() {
    const { isOpenInput, keywords } = this.state;
    const { defaultKeyword } = this.props;
    return (
      <div className="search_box">
        <div className="search_border">
          <input type="text" placeholder={defaultKeyword} value={keywords} ref="input" className={isOpenInput ? 'show_input' : ''} onChange={(e) => this.setState({ keywords: e.currentTarget.value })} onKeyDown={(e) => e.keyCode === 13 && this.search()} />
          <i className="iconfont icon-sousuo" onClick={this.search}></i>
        </div>
      </div>
    )
  }
}
