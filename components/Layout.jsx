import React from 'react'
import Link from 'next/link'
const links = [
    { name: '博客', href: 'blogs' },
    { name: '留言', href: 'contacts' }
]
export default class App extends React.Component {
    state = {
        current: 'mail',
        searchWidth: 150
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }
    render() {
        const { children } = this.props
        return <div>
            <header className="main-header">
                <div className="do-common-container">
                    <div className="logo-brand">
                        <Link href="/index">
                            <a><img src="/static/dodo-logo.png" alt="" /></a>
                        </Link>
                    </div>
                    <div className="do-pull-right">
                        <div className="main-tabs">
                            {
                                links.map((link, index) => (
                                    <Link key={index} href={link.href}><a>{link.name}</a></Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </header>
            <div className="main-content">
                {children}
            </div>
            <footer className="main-footer">
                <p>&copy; 2018 dodo</p>
                <p><a href="https://github.com/soWhiteSoColl/just-dodo-web#%E4%BB%8B%E7%BB%8D" target="new">Fork In Github</a></p>
            </footer>
        </div >
    }
}
