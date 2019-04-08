import React from 'react'
import Head from 'next/head'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import { AnimateQueue, ScrollDetect, Button } from 'ui'
import Icon from 'ui/Icons'
import { downloadFile, secondToMunite } from 'tools/main'

@inject('musicStore')
@observer
class SearchedItem extends React.Component {
  handlePlay = () => {
    const { musicStore, ...music } = this.props
    const { currentMusic, paused } = musicStore

    if (music.id === currentMusic.id) {
      return this.props.musicStore.setValues({ paused: !paused })
    }

    this.props.musicStore.appendMusic(music)
    this.props.musicStore.setValues({
      paused: false,
      currentMusic: music
    })
  }

  handleDownLoad = () => {
    downloadFile(this.props.url)
  }

  render() {
    const { name, singer, id, style, time } = this.props
    const { currentMusic, paused } = this.props.musicStore
    const active = id === (currentMusic && currentMusic.id)

    return (
      <li className="music-info-item" style={style}>
        <span className="music-info-name">{name}</span>
        <span className="music-info-toggle">
          <div className={classnames('music-info-btn', active && 'active')} onClick={() => this.handlePlay()}>
            <Icon type={active && !paused ? 'play' : 'pause'} />
          </div>
          <div className={classnames('music-info-btn')} onClick={() => this.handleDownLoad()}>
            <Icon antd={true} type={'download'} />
          </div>
        </span>
        <span className="music-info-singer">{singer}</span>
        <span className="music-info-time">{secondToMunite(time)}</span>
      </li>
    )
  }
}

export default class Search extends React.Component {
  static getInitialProps() {
    return { audioConfig: { position: 'bottom' }, footer: false }
  }

  state = {
    searched: this.props.musicStore.searchValue,
    showNum: 12,
    loading: false,
    startSearch: false
  }

  componentWillUnmount() {
    clearTimeout(this.changeTimer)
  }

  handleSearch = async () => {
    if (this.props.musicStore.searchValue === this.state.searched) {
      return false
    }

    this.setState({ loading: true })
    clearTimeout(this.changeTimer)
    this.props.musicStore.setValues({ searchedList: [] })
    await this.props.musicStore.search(this.state.searched)
    this.setState({ loading: false })
  }

  handleChange = e => {
    this.setState({ searched: e.target.value })
    clearTimeout(this.changeTimer)
    this.changeTimer = setTimeout(() => this.handleSearch(), 1000)
  }

  handleShowMore = () => {
    this.setState({ showNum: this.state.showNum + 12 })
  }

  render() {
    const { searchedList } = this.props.musicStore
    const { searched, showNum, loading } = this.state
    const hasResult = searchedList && searchedList.length
    const noMore = showNum >= searchedList.length

    return (
      <>
        <Head>
          <title>小寒的音乐-搜索</title>
        </Head>
        <div className="music-search-page">
          <div className="do-content-container">
            <div className="music-search-wrapper" style={{ marginTop: hasResult || loading ? '40px' : '200px' }}>
              <div className="music-search">
                <input
                  value={searched}
                  placeholder="告诉我你想听什么呀"
                  className="music-search-input"
                  type="text"
                  onChange={this.handleChange}
                  onKeyDown={e => e.keyCode === 13 && this.handleSearch()}
                />
                <Button className="music-search-btn" onClick={this.handleSearch}>
                  <Icon type="search" antd={true} />
                </Button>
              </div>
            </div>
            {loading && <div className="do-fetching-loading">搜索中...</div>}
            {!loading && hasResult ? (
              <ScrollDetect onScrollOut={this.handleShowMore} protectTime={300} detect={!noMore}>
                <div className="music-info-list-wrapper">
                  <ul className="music-info-list music-search-list">
                    <li className="music-info-item music-info-item-title">
                      <span className="music-info-name">歌曲</span>
                      <span className="music-info-toggle" />
                      <span className="music-info-singer">歌手</span>
                      <span className="music-info-time">时长</span>
                    </li>
                    <AnimateQueue
                      animate={true}
                      interval={50}
                      speed={600}
                      from={{ transform: 'translateY(80px)' }}
                      to={{ transform: 'translateX(0px)' }}
                    >
                      {searchedList.slice(0, showNum).map(music => (
                        <SearchedItem key={music.id} {...music} />
                      ))}
                    </AnimateQueue>
                  </ul>
                  {!noMore && <div className="do-fetching-loading">加载中...</div>}
                </div>
              </ScrollDetect>
            ) : null}
          </div>
        </div>
      </>
    )
  }
}
