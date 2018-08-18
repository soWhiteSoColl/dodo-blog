import React, { Component } from 'react';

class Message extends Component {
    render() {
        const { type, children } = this.props
        return (
            React.createPortal(
                <div className={`message message-${type}`}>
                    {children}
                </div>,
                document.getElementById('message-root')
            )
        );
    }
}

export default Message;
