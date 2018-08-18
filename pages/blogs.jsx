import React, { Component } from 'react'
import withLayout from '../components/Layout'
import { computed } from 'mobx'
import { dateFilter } from '../util/tool'
import Link from 'next/link'

class Blogs extends Component {
    static async getInitialProps(_, store) {
        const blogs = await store.blogStore.list()
        return { blogs }
    }

    @computed
    get blogs() {
        let blogs = this.props.blogs || []
        blogs = blogs && blogs.list && blogs.list.length ? blogs.list : []
        return blogs.reduce((pre, blog) => {
            const date = dateFilter(blog.created_at)
            if (pre[date]) {
                pre[date].push(blog)
            } else {
                pre[date] = [blog];
            }
            return pre;
        }, {})
    }

    render() {
        return (
            <div className="do-content-container">
                {
                    (() => {
                        let elArr = [];
                        const blogs = this.blogs
                        for (let date in blogs) {
                            elArr.push(
                                <div className="blog-item" key={date}>
                                    <p>{date}</p>
                                    {
                                        blogs[date].map((blog, index) =>
                                            <div className="blog-title" key={index}>
                                                <Link href={"/blog-detail?id=" + blog._id}>
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
        );
    }
}

export default withLayout(Blogs)
