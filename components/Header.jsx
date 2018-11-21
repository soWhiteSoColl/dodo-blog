import React, { Component } from 'react';
import Link from 'next/link'
import classnames from 'classnames'
import { withRouter } from 'next/router'


const menus = [
	{ href: '/', label: '博客' },
	{ href: '/musics', label: '音乐', active: route => route === '/musics' || route === '/music' },
	{ href: 'https://ui.justdodo.cn', label: '组件库', target: '_new' },
	{ href: '/contact', label: '留言' },
]

@withRouter
class Header extends Component {
	handleLogin = () => {
		this.props.userStore.login()
			.then(data => window.location.href = data.path)
	}


	render() {
		const current = this.props.router.asPath

		return (
			// <AnimateQueue
			// 	animate={true}
			// 	from={{ transform: 'translateX(80px)' }}
			// 	to={{ transform: 'translateX(0px)' }}
			// >
			<header className="main-header">
				<div className="do-content-container">
					<div className="logo-brand">
						<Link href="/home">
							<a><img src="/static/dodo-logo.png" alt="" /></a>
						</Link>
					</div>
					<div className="do-pull-right">
						{
							menus.map(({ href, label, target, active }, index) => (
								<Link href={href} key={index}>
									<a target={target} className={classnames((active ? active(current) : href === current) && 'active')}>
										<span className="header-inner-text">{label}</span>
									</a>
								</Link>
							))
						}
					</div>
				</div>
			</header>
			// </AnimateQueue>
		)
	}
}

export default Header
