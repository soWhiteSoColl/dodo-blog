import React, { Component } from 'react';
import Link from 'next/link'


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
                        <Link href="/blogs">
                            <a>博客</a>
                        </Link>
                        <Link href="/contact">
                            <a>留言</a>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
