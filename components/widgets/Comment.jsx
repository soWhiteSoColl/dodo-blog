import React from 'react'

export default function Comment(props) {
  const content = props.content.replace('<', '\&lt;').replace('\n', '<br/>').replace(' ', '&nbsp;')

  return (
    <div className="w-comment-item">
      <span className="w-comment-item-nickname">{props.nickname}</span>
      <div className="w-comment-item-content">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  )
}

export function CommentList(props) {
  return (
    <div className="w-comment-list">
      {props.children}
    </div>
  )
}
