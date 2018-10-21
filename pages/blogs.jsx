import React, { Component } from 'react'
import withLayout from '../components/Layout'
import { dateFormater } from '../util/tool'
import Link from 'next/link'
import Head from 'next/head'
import ToTop from '../components/ToTop'
const Date = props => <div className="blogs-group-date">{dateFormater(props.date)}</div>

const BlogItem = props => {
  const blog = props.blog

  return (
    <section className="blog-title">
      <Link href={`/blogs/${blog._id}`}>
        <a>{blog.title}</a>
      </Link>
    </section>
  )
}

const BlogGroup = props => {
  const blogs = [...props.blogs]
  const blogSort = blogs
    .sort((a, b) => a.created < b.created)
    .reduce((result, blog) => {
      const date = dateFormater(blog.created)
      if (result[date]) {
        result[date].push(blog)
      } else {
        result[date] = [blog]
      }
      return result
    }, {})

  return (
    <div className="blogs-list" ref={props.elRef}>
      {
        Object.entries(blogSort).map(([date, blogs]) => (
          <div className="blogs-group" key={date}>
            <Date date={date} />
            {blogs.map(blog => <BlogItem key={blog._id} blog={blog} />)}
          </div>
        ))
      }
    </div>
  )
}

@withLayout
export default class Blogs extends Component {
  $blogs = React.createRef()
  fetching = false

  state = {
    loading: false
  }
  static async getInitialProps(cxt, store) {
    const blogs = await store.blogStore.list(1)
    return { blogs }
  }

  componentDidMount() {
    const blogs = this.props.blogs
    this.props.blogStore.setValues({ blogs })
    setTimeout(() => this.handleScroll())
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const elBottom = this.$blogs.current.getBoundingClientRect().bottom
    const windowHeihgt = window.innerHeight
    if (this.props.blogStore.blogs.noMore) {
      window.removeEventListener('scroll', this.handleScroll)
    }
    if (elBottom <= windowHeihgt) {
      if (!this.fetching) {
        this.handleFetchMore()
      }
    }
  }

  handleFetchMore = () => {
    this.fetching = true
    this.setState({ loading: true })
    this.props.blogStore.list()
      .then(() => {
        this.fetching = false
        this.setState({ loading: false })
      })
  }

  render() {
    const { blogs } = this.props.blogStore
    // const { noMore } = blogs
    const { loading } = this.state

    return (
      <React.Fragment>
        <Head>
          <title>dodo 博客</title>
          <meta name="keywords" content={'博客 技术 前端'}/>
          <meta name="description" content={'dodo的博客列表'}/>
        </Head>
        <div className="do-content-container">
          <BlogGroup elRef={this.$blogs} blogs={blogs.list} />
          {loading && <div className="do-text-loading">加载中...</div>}
        </div>
        {/* <ToTop/> */}
      </React.Fragment>
    )
  }
}
