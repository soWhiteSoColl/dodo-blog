import React from 'react';
import withLayout from '../components/Layout'

@withLayout
export default class Contact extends React.Component {
    state = {
        name: '',
        content: '',
        leaveWords: []
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="do-common-container">
                <div className="contact-form">
                    <div className="do-group">
                        <input className="do-input" type="text" placeholder="留下大名" />
                    </div>
                    <div className="do-group">
                        <textarea className="do-input" cols="30" rows="10" placeholder="有何贵干"></textarea>
                    </div>
                    <div className="do-group">
                        <button className="do-btn do-btn-primary">留言</button>
                    </div>
                </div>
            </div>
        );
    }
}
