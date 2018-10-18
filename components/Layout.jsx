import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider, observer, inject } from 'mobx-react'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../styles/index.less'
import '../config/axios'
import store from '../store'

function Layout(Component, option) {
    option = option || {}
    const {header: hasHeader = true, footer: hasFooter = true, headerComponent} = option
    const ObserverComponent = inject(store => store)(observer(Component))
    return class Page extends React.Component {
        static async getInitialProps(ctx) {
            let initialProps
            if (Component.getInitialProps) {
                initialProps = await Component.getInitialProps(ctx, store)
            }
            return { initialProps }
        }

        componentDidMount() {
            Router.onRouteChangeStart = () => NProgress.start()
            Router.onRouteChangeComplete = () => NProgress.done()
            Router.onRouteChangeError = () => NProgress.done()
        }

        render() {
            const { initialProps } = this.props
            return (
                <Provider {...store}>
                    <React.Fragment>
                        {hasHeader && (headerComponent || <Header />)}
                        <div className="main-content">
                            <ObserverComponent {...initialProps} />
                        </div>
                        {/* {hasFooter && <Footer />} */}
                    </React.Fragment>
                </Provider>

            )
        }
    }

}

export default Layout