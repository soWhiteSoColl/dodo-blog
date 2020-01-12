import React, { useRef, useEffect } from 'react'
import Typer from '../../components/Typer'
import { connect } from 'react-redux'
import './index.scss'

const content = `
## 嗨。
#### 我叫小寒，
是这个网站的设计者和开发者。
很开心你能来到了我的小站。
网站的资源不多，但希望能给你带来一些帮助。
博客的代码是开源的，这是这个项目的 [github地址]+(https://github.com/hanruto/dodo-blog)，记得给个star哦。
看博客点 [这里]-(/) 。
`

function Home(props) {
  const isTyperFirstRendered = props.isTyperFirstRendered

  useEffect(() => {
    if (!props.isTyperFirstRenderedRef) {
      props.setIsTyperFirstRendered(true)
    }
  }, [])

  return (
    <div className="page-common-container home-page">
      <Typer content={content} rendered={isTyperFirstRendered} />
    </div>
  )
}

const mapState = state => ({ ...state.globalModel })

const mapDispatch = state => ({ ...state.globalModel })

export default connect(mapState, mapDispatch)(Home)
