import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Logo from '../../components/Logo'
import CommentList from '../../components/CommentList'
import Footer from '../../components/Footer'
import { track } from '../../utils/common'
import './index.scss'

function ContactPage(props) {
  const { getComments, comments, leaveMessage } = props
  const [nickname, setNickname] = useState('')
  const [comment, setComment] = useState('')

  const handleNicknameChange = e => {
    setNickname(e.target.value)
  }

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    leaveMessage({
      type: 2,
      content: comment,
      nickname,
    })

    setNickname('')
    setComment('')
  }

  useEffect(() => {
    track('enter-contact', 'route-change')

    getComments({ type: 2 })
  }, [])

  return (
    <div className="contact-page page-common-container">
      <Head>
        <title>小寒的博客-留言板</title>
      </Head>
      <Logo />
      <form className="contact-form">
        <input
          value={nickname}
          className="contact-form-username"
          type="text"
          maxLength={6}
          placeholder="名字或者昵称"
          onChange={handleNicknameChange}
        />
        <textarea
          value={comment}
          maxLength={300}
          className="contact-form-textarea"
          placeholder="写点什么吧..."
          onChange={handleCommentChange}
        ></textarea>
        <button
          disabled={!nickname || !comment}
          onClick={handleSubmit}
          className="contact-form-submit"
        >
          留言
        </button>
      </form>

      {!!(comments && comments.list.length) && (
        <>
          <div className="page-common-section-title comment-list-title">
            全部留言
          </div>
          <CommentList comments={comments.list} />
        </>
      )}

      <Footer />
    </div>
  )
}

const mapState = state => ({ ...state.blogModel, ...state.globalModel })

const mapDispatch = state => ({ ...state.blogModel, ...state.globalModel })

export default connect(mapState, mapDispatch)(ContactPage)
