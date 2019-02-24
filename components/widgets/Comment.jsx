import React from 'react'
import classnames from 'classnames'
import { dateFormater } from 'tools/main'

export default function Comment(props) {
  const { content, username, style, created } = props

  return (
    <div
      className={classnames('w-comment-item', (username === '小寒' || username === '小明') && 'self-comment')}
      style={style}
    >
      <div className="w-comment-item-info">
        <span className="w-comment-item-nickname">{username}</span>
        {created && <span className="w-comment-item-time">{dateFormater(created)}</span>}
      </div>

      <div className="w-comment-item-content">
        <svg className="w-comment-item-svg">
          <path d="M.73,1.58S27.2,31.4,57.45,28.19C95,24.2,88.86,80.08,88.86,80.08S11.2,74.75.73,1.58Z" />
        </svg>
        <div className="w-comment-item-content-value" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

export function CommentList(props) {
  return <div className="w-comment-list">{props.children}</div>
}
