import React from 'react'
import {dateFormater} from '../../util/tool'

export default function Comment(props) {
  const content = props.content.replace('<', '\&lt;').replace('\n', '<br/>').replace(' ', '&nbsp;')
  return (
    <div className="w-comment-item" style={props.style}>
      <div className="w-content-item-info">
      <span className="w-comment-item-nickname">{props.nickname}</span>
      <span className="w-comment-item-time">{dateFormater(props.created)}</span>  
      </div>
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
