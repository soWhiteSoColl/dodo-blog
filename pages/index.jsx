import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Link from 'next/link'
import Head from 'next/head'
import classnames from 'classnames'
import { Drawer } from 'dodoui'
import AnimateQueue from 'ui/AnimateQueue'
import ScrollDetect from 'ui/ScrollDetect'
import stores from '../stores'
import { dateFormater } from 'tools/main'

const Tag = props => {
  const { children, active, ...rest } = props
  return (
    <span className={classnames('w-tag', active && 'active')} {...rest}>
      {children}
    </span>
  )
}

const Date = props => <div className="blogs-group-date">{props.date}</div>

const BlogItem = props => {
  const blog = props.blog
  const audio = stores.musicStore.audio
  const paused = !audio || audio.paused

  return (
    <section className="blog-title">
      <Link href={paused ? `/blogs/${blog._id}` : `/blog?id=${blog._id}`}>
        <a>{blog.title}</a>
      </Link>
    </section>
  )
}

@inject('blogStore')
@observer
class Tags extends React.Component {
  componentDidMount() {
    this.props.blogStore.getTags()
  }

  render() {
    const { tags } = this.props.blogStore
    const { selected, onChange } = this.props

    return (
      <Drawer>
        <h2 className="blogs-drawer-title">标签</h2>
        <div className="blogs-drawer-tags">
          {tags.map(tag => (
            <Tag key={tag._id} active={selected.includes(tag._id)} onClick={() => onChange(tag._id)}>
              {tag.value}
            </Tag>
          ))}
        </div>
      </Drawer>
    )
  }
}

export default class Blogs extends Component {
  $blogs = React.createRef()
  fetching = false

  state = {
    showNum: 15,
    refreshInNumberChange: false
  }

  static async getInitialProps(cxt, stores) {
    const blogs = await stores.blogStore.list({ page: 1 })
    return { blogs }
  }

  constructor(props) {
    super(props)
    const { blogs } = props
    this.props.blogStore.setValues({ blogs })
  }

  handleShowMore = () => {
    this.setState({ showNum: this.state.showNum + 10 })
  }

  handleToggleTag = id => {
    let selectedTags
    if (this.props.blogStore.blogs.tags[0] === id) {
      selectedTags = []
    } else {
      selectedTags = [id]
    }
    this.setState({ refreshInNumberChange: true })
    this.props.blogStore
      .list({ page: 1, tags: selectedTags })
      .then(() => this.setState({ refreshInNumberChange: false }))
  }

  get blogSort() {
    const list = this.props.blogStore.blogs.list || []
    const blogSort = list
      .filter(blog => blog.type === 1)
      .slice(0, this.state.showNum)
      .reduce((result, blog) => {
        const date = dateFormater(blog.created, false, { daySplit: ' / ' })
        if (result[date]) {
          result[date].push(blog)
        } else {
          result[date] = [blog]
        }
        return result
      }, {})
    return blogSort
  }

  render() {
    const { blogs } = this.props.blogStore
    const { tags: selectedTags } = this.props.blogStore.blogs
    const noMore = this.state.showNum >= blogs.list.length
    const { refreshInNumberChange } = this.state

    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 博客列表</title>
        </Head>
        <div className="do-content-container">
          <div className="blogs-list" ref={this.$blogs}>
            <ScrollDetect onScrollOut={this.handleShowMore} detect={!noMore} protectTime={500}>
              <AnimateQueue
                animate={true}
                interval={100}
                speed={600}
                from={{ transform: 'translateX(100px)' }}
                to={{ transform: 'translateX(0px)' }}
                refreshInNumberChange={refreshInNumberChange}
              >
                {Object.entries(this.blogSort).map(([date, blogs]) => (
                  <div className="blogs-group" key={date}>
                    <Date date={date} />
                    {blogs.map(blog => (
                      <BlogItem key={blog._id} blog={blog} />
                    ))}
                  </div>
                ))}
              </AnimateQueue>
            </ScrollDetect>
            {!noMore && <div className="do-fetching-loading">加载中...</div>}
          </div>
        </div>
        <Tags selected={selectedTags} onChange={this.handleToggleTag} />
      </React.Fragment>
    )
  }
}
