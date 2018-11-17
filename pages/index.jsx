import React, { Component } from 'react'
import { dateFormater } from '../util/tool'
import Link from 'next/link'
import Head from 'next/head'
// import { AnimateQueue } from 'dodoui'
import Drawer from '../components/widgets/Drawer'
import { AnimateQueue } from '../components/widgets/AnimateQueue'
import classnames from 'classnames'


const Tag = props => {
  const { children, color, ...rest } = props

  return (
    <span
      className={classnames("w-tag", color && 'w-tag-custom-color')}
      style={{
        background: color,
        borderColor: color,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}

const Date = props => <div className="blogs-group-date">{props.date}</div>

const BlogItem = props => {
  const blog = props.blog

  return (
    <section className="blog-title">
      <Link href={`/blog?id=${blog._id}`}>
        <a>{blog.title}</a>
      </Link>
    </section>
  )
}


export default class Blogs extends Component {
  $blogs = React.createRef()
  $blogsElement = React.createRef()
  fetching = false

  state = {
    loading: false,
    selectTags: [],
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

    setTimeout(this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if(!this.$blogs.current) return false
    
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

  handleRefetch = () => {
    this.props.blogStore.list(1, this.state.selectTags)
      .then(() => {
        this.setState({ reloading: true })
        setTimeout(() => this.setState({ reloading: false }), 200)
      })
  }

  handleToggleTag = id => {
    const { selectTags } = this.state
    const findIndex = selectTags.findIndex(item => item === id)

    if (findIndex === -1) {
      selectTags.push(id)
    } else {
      selectTags.splice(findIndex, 1)
    }

    this.setState({ selectTags }, this.handleRefetch)
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
    const { tags } = this.props.blogStore
    const { loading, selectTags, reloading } = this.state

    return (
      <React.Fragment>
        <Head>
          <title>dodo-小寒的博客-博客列表</title>
          <title>dodo-小寒的博客-博客列表</title>
          <title>dodo-小寒的博客-博客列表</title>
          
        </Head>
        
        <div className="do-content-container">
          {!reloading
            ? (
              <div className="blogs-list" ref={this.$blogs}>
                <AnimateQueue
                  animate={true}
                  interval={200}
                  speed={600}
                  from={{ transform: 'translateX(80px)' }}
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
          <div>
            {tags.map(tag => <Tag
              key={tag._id}
              color={selectTags.includes(tag._id) && '#39f'}
              onClick={() => this.handleToggleTag(tag._id)}
            >
              {tag.value}
            </Tag>)}
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}
