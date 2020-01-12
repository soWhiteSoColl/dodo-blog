import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import Logo from '../../components/Logo'
import AnimateQueue from '../../components/AnimateQueue'
import { formatUrl } from '../../utils/common'
import './index.scss'

function BlogDetailPage(props) {
  const { currentBlog, getBlog } = props

  useEffect(() => {
    const { query } = formatUrl()

    getBlog(query.id)
  }, [])

  return (
    <div className="blog-detail-page page-common-container">
      <Logo />
      <AnimateQueue animate={true}>
        <h2 className="page-common-blog-title">{currentBlog.title}</h2>
        <div className="blog-created">
          {dayjs(currentBlog.created).format('YYYY / MM / DD')}
        </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: currentBlog.content }}
        />
      </AnimateQueue>
    </div>
  )
}

const mapState = state => ({ ...state.blogModel })

const mapDispatch = state => ({ ...state.blogModel })

export default connect(mapState, mapDispatch)(BlogDetailPage)
