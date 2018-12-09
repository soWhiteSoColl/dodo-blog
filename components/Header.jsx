import React, { Component } from 'react';
import Link from 'next/link'
import classnames from 'classnames'
import { withRouter } from 'next/router'


const musicMenus = [
	{ href: '/', label: '去看博客' },
	{ href: '/music/search', label: '搜索' },
	{ href: '/music/leader', label: '排行榜' },
	{ href: '/music/list', label: '歌单' },
]

const blogMenus = [
	{ href: '/', label: '博客', active: route => route === '/' || /^\/blogs\/.*/.test(route) },
	{ href: '/contact', label: '留言' },
	{ href: '/music/list', label: '去听音乐' },
]

@withRouter
class Header extends Component {
	handleLogin = () => {
		this.props.userStore.login()
			.then(data => window.location.href = data.path)
	}

	render() {
		const current = this.props.router.asPath
		const menus = current.match(/^\/music\//) ? musicMenus : blogMenus

		return (
			<header className="main-header">
				<div className="do-content-container">
					<div className="logo-brand">
						<Link href="/home">
							<a><img src="/static/dodo-logo.png" alt="" /></a>
						</Link>
					</div>
					<div className="do-pull-right">
						{
							menus.map(({ href, label, active, hiddenXs, ...rest }, index) => (
								<Link href={href} key={index}>
									<a
										className={classnames((active ? active(current) : href === current) && 'active', hiddenXs && 'hidden-xs')}
										{...rest}
									>
										<span className="header-inner-text">{label}</span>
									</a>
								</Link>
							))
						}
					</div>
				</div>
			</header>
		)
	}
}

export default Header
