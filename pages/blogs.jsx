import React, { Component } from 'react'
import withLayout from '../components/Layout'
import { computed } from 'mobx'
import { dateFilter } from '../util/tool'
import Link from 'next/link'

class Blogs extends Component {
  state = {
    loading: false
  }

  fetching = false

  componentDidMount() {
    this.fetch()
      .then(() => {
        this.checkDataEnough()
        window.addEventListener('scroll', this.checkDataEnough)
      })
  }

  checkDataEnough = () => {
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const totalHeight = document.documentElement.scrollHeight
    if (totalHeight - scrollTop - clientHeight < 200) {
      !this.fetching && this.fetch()
    }
  }

  fetch = () => {
    // 不可以再获取数据
    this.fetching = true
    this.setState({ loading: true })  // loading 效果
    return this.props.blogStore.list()
      .then(() => {
        this.fetching = false
        this.setState({ loading: false })
      })
  }

  @computed
  get blogs() {
    let blogs = this.props.blogStore.blogs.list || []
    return blogs.sort((a, b) => a.created < b.created).reduce((pre, blog) => {
      const date = dateFilter(blog.created)
      if (pre[date]) {
        pre[date].push(blog)
      } else {
        pre[date] = [blog]
      }
      return pre
    }, {})
  }

  render() {
    return (
      <div className="do-content-container">
        {
          (() => {
            let elArr = []
            const blogs = this.blogs
            for (let date in blogs) {
              elArr.push(
                <div className="blog-item" key={date}>
                  <p>{date}</p>
                  {
                    blogs[date].map((blog, index) =>
                      <div className="blog-title" key={index}>
                        <Link href={"/blog?id=" + blog._id}>
                          <a>{blog.title}</a>
                        </Link>
                      </div>)
                  }
                </div>
              )
            }
            return elArr
          })()
        }
      </div>
    )
  }
}

export default withLayout(Blogs)
