import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Link from 'next/link'
import Head from 'next/head'
import classnames from 'classnames'
import { ScrollDetect, Drawer, Button, AnimateQueue } from 'ui'
import { dateFormater } from 'tools/main'

const Tag = props => {
  const { children, active, ...rest } = props
  return (
    <Button type={active ? 'primary' : 'default'} className={classnames('w-tag')} {...rest}>
      {children}
    </Button>
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

@inject('blogStore')
@observer
class Tags extends React.Component {
  state = { animate: false }

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
    animateExit: false
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
    this.setState({ animateExit: true })
    setTimeout(() => {
      this.props.blogStore.list({ page: 1, tags: selectedTags }).then(() => this.setState({ animateExit: false }))
    }, 300)
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
    const { showNum, animateExit } = this.state
    const noMore = showNum >= blogs.list.length

    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 博客列表</title>
        </Head>
        <div className="do-content-container">
          <div className="blogs-list" ref={this.$blogs}>
            <ScrollDetect onScrollOut={this.handleShowMore} detect={!noMore} protectTime={500}>
              <AnimateQueue
                exit={animateExit}
                animate={true}
                from={{ transform: 'translateX(100px)', opacity: 0 }}
                to={{ transform: 'translateX(0px)', opacity: 1 }}
                interval={80}
                speed={500}
              >
                {Object.entries(this.blogSort).map(([date, blogs]) => (
                  <div className="blogs-group" key={date}>
                    <Date date={date} />
                    {blogs.map((blog, index) => (
                      <BlogItem key={blog._id + index} blog={blog} />
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
