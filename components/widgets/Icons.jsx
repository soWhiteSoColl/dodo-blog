import React from 'react'
import classnames from 'classnames'

export default class SvgIcon extends React.Component {
  render() {
    const { type, antd, className, active, ...rest } = this.props

    if (antd) {
      return (
        <span className={classnames('svg-icon-wrapper', className, active && 'active')}>
          <svg
            className={classnames("svg-icon", "svg-icon-antd", "svg-icon-" + type)}
            viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
          >
            {(() => {
              switch (type) {
                case 'loop':
                  return <path
                    d="M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9 0.6 3.7 1.8 5.2 2.9 3.6 8.1 4.3 11.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8c-1.5-1.2-3.3-1.8-5.2-1.8-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8z m752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-0.6-3.7-1.8-5.2-2.9-3.6-8.1-4.3-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-0.2-4.4-3.8-8-8.2-8z"
                  />
                case 'music':
                  return <path
                    d="M512 128l256 0 0 169.984-169.984 0 0 427.989333q0 70.016-50.986667 120.021333t-121.002667 50.005333-120.021333-50.005333-50.005333-120.021333 50.005333-121.002667 120.021333-50.986667q41.984 0 86.016 24.021333l0-450.005333z"
                  />
                case 'random':
                  return <path
                    d="M950.616094 1023.999269a73.124315 73.124315 0 0 1-51.918264-21.206052 73.124315 73.124315 0 0 1 0-103.836527l21.937295-21.206051H731.243149a73.124315 73.124315 0 0 1-62.155668-34.368428L325.403201 292.75612H73.124315a73.124315 73.124315 0 0 1 0-146.24863h292.49726a73.124315 73.124315 0 0 1 62.155667 34.368428l121.386363 193.779434 119.923876-193.779434A73.124315 73.124315 0 0 1 731.243149 146.50749h189.391976l-21.937295-21.206051A73.124315 73.124315 0 0 1 1002.534357 21.464911l146.24863 146.24863a73.124315 73.124315 0 0 1 0 103.836527l-146.24863 146.24863a73.124315 73.124315 0 0 1-103.836527-103.836527l21.937295-21.206051h-146.24863l-138.936198 219.372944 136.011225 219.372945h146.24863l-21.937294-21.206051a73.124315 73.124315 0 0 1 103.836527-103.836527l146.24863 146.248629a73.124315 73.124315 0 0 1 0 103.836528l-146.24863 146.248629A73.124315 73.124315 0 0 1 950.616094 1023.999269z m-584.994519-146.24863H73.124315a73.124315 73.124315 0 0 1 0-146.24863h253.010129l25.593511-40.218373a73.124315 73.124315 0 0 1 122.848849 79.705503l-47.530805 73.124315A73.124315 73.124315 0 0 1 365.621575 877.750639z"
                  />
              }

            })()
            }
          </svg>
        </span>
      )
    }

    return (
      <span className={classnames('svg-icon-wrapper', className, active && 'active')}>
        <svg {...rest} className={classnames("svg-icon", type && "svg-icon-" + type)}>
          {(() => {
            switch (type) {
              case 'play':
                return <path d={'M 25 5 5 5 5 25 25 25 25 5'}></path>
              case 'pause':
                return <path d={'M4 15 22 4 22 26 4 15 4 15'}></path>
              case 'left-arrow':
                return <path d={'M 20 5 10 15 20 25'}></path>
              case 'right-arrow':
                return <path d={'M 10 5 20 15 10 25'}></path>
              case 'top-arrow':
                return <path d={'M 5 20 15 10 25 20'}></path>
              case 'menu':
                return <path d={'M5 7 25 7  M5 15 25 15 M5 23 25 23'}></path>
              case 'bars':
                return <path d={'M5 25 5 15 M15 25 15 10 M25 25 25 5'}></path>
            }
          })()}
        </svg>
      </span>

    )
  }
}
