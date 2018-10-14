import React, { Component } from 'react';
import Link from 'next/link'

const links = [
    { name: '博客', href: '/blogs' },
    { name: '留言', href: '/contact' },
    { name: '登录', href: '/login' }
]

class Header extends Component {
    render() {
        return (
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
        );
    }
}

export default Header;
