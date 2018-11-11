import React, { Component } from 'react';
import Link from 'next/link'
import classnames from 'classnames'
import {withRouter} from 'next/router'



const menus = [
	{ href: '/blogs', label: '博客' },
	{ href: '/musics', label: '音乐' },
	{ href: '/contact', label: '留言' }
]


@withRouter
class Header extends Component {
	render() {
		const current = this.props.router.asPath

		return (
			<header className="main-header">
				<div className="do-content-container">
					<div className="logo-brand">
						<Link href="/index">
							<a><img src="/static/dodo-logo.png" alt="" /></a>
						</Link>
					</div>
					<div className="do-pull-right">
						{
							menus.map(({href, label}, index) => (
								<Link href={href} key={index}>
									<a className={classnames(href === current && 'active')}><span className="header-inner-text">{label}</span></a>
								</Link>
							))
						}
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
