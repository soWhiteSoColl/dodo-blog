import React, { Component } from 'react'
import { dateFormater } from '../util/tool'
import Link from 'next/link'
import Head from 'next/head'
import Drawer from '../components/widgets/Drawer'
import { AnimateQueue } from '../components/widgets/AnimateQueue'
import classnames from 'classnames'
import store from '../store'

const Tag = props => {
  const { children, active, ...rest } = props

  return (
    <span
      className={classnames("w-tag", active && 'active')}
      {...rest}
    >
      {children}
    </span>
  )
}

const Date = props => <div className="blogs-group-date">{props.date}</div>


const BlogItem = props => {
  const blog = props.blog
  const audio = store.musicStore.audio
  return (
    <section className="blog-title">
      {
        audio && !audio.paused
          ? <Link href={`/blog?id=${blog._id}`}>
            <a>{blog.title}</a>
          </Link>
          : <Link href={`/blogs/${blog._id}`}>
            <a>{blog.title}</a>
          </Link>
      }
      <div className="for-spider">
        <Link href={`/blog?id=${blog._id}`}>
          <a>{blog.title}</a>
        </Link>
        <Link href={`/blogs/${blog._id}`}>
          <a>{blog.title}</a>
        </Link>
      </div>
    </section>
  )
}


export default class Blogs extends Component {
  $blogs = React.createRef()
  $blogsElement = React.createRef()
  fetching = false

  state = {
    loading: false,
    reloading: false,
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

    setTimeout(this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (!this.$blogs.current) return false

    const elBottom = this.$blogs.current.getBoundingClientRect().bottom
    const windowHeihgt = window.innerHeight
    if (elBottom <= windowHeihgt + 100 && !this.fetching) {
      this.handleFetchMore()
    }
  }

  handleFetchMore = () => {
    if (this.props.blogStore.blogs.noMore) {
      return false
    }
    this.fetching = true
    this.setState({ loading: true })
    this.props.blogStore.list()
      .then(() => {
        this.fetching = false
        this.setState({ loading: false })
      })
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
      .slice()
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
    const { tags, hotBlogs } = this.props.blogStore
    const { loading, reloading } = this.state
    const { tags: selectedTags } = this.props.blogStore.blogs

    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 博客列表</title>
        </Head>
        <div className="do-content-container">
          {!reloading
            ? (
              <div className="blogs-list" ref={this.$blogs}>
                <AnimateQueue
                  animate={true}
                  interval={200}
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
              </div>)
            : null
          }
          {loading && <div className="do-text-loading">加载中...</div>}
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
              <Link href={`/blog/${blog._id}`}>
                <a>
                  {blog.title}
                  {/* <span className="blogs-drawer-hot-item-count">浏览次数 {blog.viewCount}</span> */}
                </a>
              </Link>
            </div>)}
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}
