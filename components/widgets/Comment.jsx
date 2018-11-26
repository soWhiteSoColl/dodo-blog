import React from 'react'
import { dateFormater, rn } from '../../util/tool'

// const colors = ['#f96', '#3af', '#a93', '#752', '#9bb', '#69d', '851', '3a9', '#892']

export default function Comment(props) {
  const content = props.content.replace('<', '\&lt;').replace('\n', '<br/>').replace(' ', '&nbsp;')
  // const c = props.nickname.substr(0, 1)
  // const n = new Buffer(c).slice(-1)[0]


  // const color = colors[n % 9]

  return (
    <div className="w-comment-item" style={props.style}>
      <div>
        <span className="w-comment-item-nickname">{props.nickname}</span>
        <span className="w-comment-item-time">{dateFormater(props.created)}</span>
      </div>

      <div className="w-comment-item-content">
        <svg className="w-comment-item-svg">
          <path
            d="M.73,1.58S27.2,31.4,57.45,28.19C95,24.2,88.86,80.08,88.86,80.08S11.2,74.75.73,1.58Z"
          ></path>
        </svg>
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
