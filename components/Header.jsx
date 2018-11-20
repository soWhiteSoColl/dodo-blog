import React, { Component } from 'react';
import Link from 'next/link'
import classnames from 'classnames'
import {withRouter} from 'next/router'
import axios from 'axios'


const menus = [
	{ href: '/', label: '博客' },
	{ href: '/musics', label: '音乐' },
	{ href: 'https://ui.justdodo.cn', label: '组件库' },
	{ href: '/contact', label: '留言' },
]


@withRouter
class Header extends Component {
	login(){
		axios.get('https://authapi.justdodo.cn/api/login-github?end=http://justdodo.cn')
	}
	render() {
		const current = this.props.router.asPath

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
							menus.map(({href, label, target}, index) => (
								<Link href={href} key={index}>
									<a target={target} className={classnames(href === current && 'active')}><span className="header-inner-text">{label}</span></a>
								</Link>
							))
						}
						<a onClick={this.login}>登录</a>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
