import React, { Component } from 'react'
import { dateFormater } from 'tools'
import Link from 'next/link'
import Head from 'next/head'
import { Drawer } from 'dodoui'
import AnimateQueue from 'widgets/AnimateQueue'
import classnames from 'classnames'
import store from '../store'
import ScrollDetect from 'widgets/ScrollDetect'


const Tag = props => {
  const { children, active, ...rest } = props
  return (
    <span className={classnames("w-tag", active && 'active')} {...rest}>
      {children}
    </span>
  )
}

const Date = props => <div className="blogs-group-date">{props.date}</div>

const BlogItem = props => {
  const blog = props.blog
  const audio = store.musicStore.audio
  const paused = !audio || audio.paused

  return (
    <section className="blog-title">
      <Link href={paused ? `/blogs/${blog._id}` : `/blog?id=${blog._id}`}><a>{blog.title}</a></Link>
    </section>
  )
}

export default class Blogs extends Component {
  $blogs = React.createRef()
  $blogsElement = React.createRef()
  fetching = false

  state = {
    showNum: 10
  }

  static async getInitialProps(cxt, store) {
    const blogs = await store.blogStore.list(1)
    return { blogs }
  }

  componentDidMount() {
    const blogs = this.props.blogs
    this.props.blogStore.setValues({ blogs })
    this.props.blogStore.getTags()
    this.props.blogStore.getHotBlogs()
  }

  handleShowMore = () => {
    this.setState({ showNum: this.state.showNum + 10 })
  }

  handleToggleTag = id => {
    const { tags } = this.props.blogStore.blogs
    const selectedTags = [...tags]
    const findIndex = selectedTags.findIndex(item => item === id)

    if (findIndex === -1) {
      selectedTags.push(id)
    } else {
      selectedTags.splice(findIndex, 1)
    }

    this.props.blogStore.list({ page: 1, tags: selectedTags })
      .then(() => {
        this.setState({ reloading: true })
        setTimeout(() => this.setState({ reloading: false }))
      })
  }


  get blogSort() {
    const blogSort = this.props.blogStore.blogs.list
      .slice(0, this.state.showNum)
      .sort((a, b) => a.created < b.created)
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
    const { tags, hotBlogs, blogs } = this.props.blogStore
    const { tags: selectedTags } = this.props.blogStore.blogs
    const noMore = this.state.showNum >= blogs.list.length

    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 博客列表</title>
        </Head>
        <div className="do-content-container">
          <div className="blogs-list" ref={this.$blogs}>
            <ScrollDetect
              onScrollOut={this.handleShowMore}
              detect={!noMore}
              protectTime={500}
            >
              <AnimateQueue
                animate={true}
                interval={100}
                speed={600}
                from={{ transform: 'translateX(100px)' }}
                to={{ transform: 'translateX(0px)' }}
              >
                {
                  Object.entries(this.blogSort).map(([date, blogs]) => (
                    <div className="blogs-group" key={date}>
                      <Date date={date} />
                      {blogs.map(blog => <BlogItem key={blog._id} blog={blog} />)}
                    </div>
                  ))
                }
              </AnimateQueue>
            </ScrollDetect>
            {!noMore && <div className="do-fetching-loading">加载中...</div>}
          </div>
        </div>
        <Drawer>
          <h2 className="blogs-drawer-title">标签</h2>
          <div className="blogs-drawer-tags">
            {tags.map(tag => <Tag
              key={tag._id}
              active={selectedTags.includes(tag._id)}
              onClick={() => this.handleToggleTag(tag._id)}
            >
              {tag.value}
            </Tag>)}
          </div>

          <h2 className="blogs-drawer-title">最热</h2>
          <div className="blogs-drawer-hot-list">
            {hotBlogs.map(blog => <div
              key={blog._id}
              className="blogs-drawer-hot-item"
            >
              <Link href={`/blog?id=${blog._id}`}><a>{blog.title}</a></Link>
            </div>)}
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}
