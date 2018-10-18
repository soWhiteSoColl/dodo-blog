import React from 'react'
import Link from 'next/link'
import withLayout from '../components/Layout'
import '../styles/index.less'
import mouseMoveAnimation from '../util/mouse-animation'


const links = [
    { to: '/blogs', text: '博客' },
    // { to: '/articles', text: '杂谈' },
    // { to: '/pictures', text: '图库' },
    { to: '/contact', text: '留言' }
]

class App extends React.Component {
    canvasBg = React.createRef()
    componentDidMount() {
        const canvasBg = this.canvasBg.current
        mouseMoveAnimation(canvasBg)
    }
    render() {
        return <div className="index-page">
            <div className="index-container">
                <div className="index-logo">
                    <img src="/static/dodo-logo.png" alt="" />
                </div>

                <div className="index-links">
                    {links.map((link, index) => <Link key={index} href={link.to}><a>{link.text}</a></Link>)}
                </div>
            </div>
            <div className="index-canvas-bg" ref={this.canvasBg}></div>
        </div>
    }
}

export default withLayout(App, { header: false, footer: false })