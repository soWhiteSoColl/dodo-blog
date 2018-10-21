import React, { Component } from 'react'


class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                <div className="do-common-container">
                    {/* <span className="main-footer-item"><Pop><span>@微信 小寒</span></Pop></span> */}
                    <span className="main-footer-item">@<a target="_new" href="https://github.com/soWhiteSoColl">github soWhiteSoColl</a></span>
                    <span className="main-footer-item">&copy;2018 dodo</span>
                </div>
            </footer>
        );
    }
}

export default Footer
