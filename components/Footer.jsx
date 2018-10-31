import React, { Component } from 'react'
import { Dialog } from 'dodoui';

class Footer extends Component {
    // handleShowQrcode = () => {
    //     Dialog.open({
    //         title: '加微信',
    //         content: <img className="main-footer-wx-qrcode" src="/static/qrcode.jpg" alt=""/>,
    //         animationIn: 'bounce',
    //     })
    // }
    render() {
        return (
            <footer className="main-footer">
                <div className="do-common-container">
                    {/* <span className="main-footer-item"><span className="do-link" onClick={this.handleShowQrcode}>@微信 小寒</span></span> */}
                    <span className="main-footer-item"><a target="_new" href="https://github.com/soWhiteSoColl">@github soWhiteSoColl</a></span>
                    <span className="main-footer-item">&copy;2018 dodo</span>
                </div>
            </footer>
        );
    }
}

export default Footer
