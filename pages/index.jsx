import React from 'react'
import Link from 'next/link'
import '../styles/index.less'
import mouseMoveAnimation from '../util/mouse-animation'
import Head from 'next/head'

const links = [
    { to: '/blogs', text: '博客' },
    { to: '/musics', text: '音乐' },
    { to: '/contact', text: '留言' }
]

export default class App extends React.Component {
    canvasBg = React.createRef()
    static getInitialProps(){
        return {footer: false, header: false}
    }
    componentDidMount() {
        const canvasBg = this.canvasBg.current
        mouseMoveAnimation(canvasBg)
    }
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>dodo 主页</title>
                </Head>
                <div className="index-page">
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
            </React.Fragment>
        )
    }
}
