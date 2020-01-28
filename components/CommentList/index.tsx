import React from 'react'
import dayjs from 'dayjs'
import './index.scss'

interface Props {
  comments: {
    nickname: string
    created: string
    content: string
    _id: string
  }[]
}

export default function CommentList(props: Props) {
  const { comments } = props

  if (!comments || !comments.length) {
    return <div className="no-comment">暂无评论</div>
  }
  return (
    <ul className="comment-list">
      {comments.map(item => {
        return (
          <li key={item._id} className="comment-item">
            <div className="comment-nickname">{item.nickname}</div>
            <div className="comment-created">
              {dayjs(item.created).format('YYYY.MM.DD HH:mm')}
            </div>
            <div className="comment-content">{item.content}</div>
          </li>
        )
      })}
    </ul>
  )
}
