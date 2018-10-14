import React from 'react'
import Link from 'next/link'
import withLayout from '../components/Layout'

const links = [
    { to: '/blogs', text: '博客' },
    { to: '/articles', text: '杂谈' },
    { to: '/pictures', text: '图库' },
    { to: '/contact-us', text: '留言' }
]

class App extends React.Component {
    render() {
        return <div className="index-page">
            <div className="index-container">
                <img src="/static/dodo-logo-white.png" alt="" />

                <div>
                    {
                        links.map((link, index) =>
                            <div key={index}>
                                <Link href={link.to}><a>{link.text}</a></Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    }
}

export default withLayout(App, {header: false, footer: false})