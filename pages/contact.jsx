import React, { Component } from 'react';
import withLayout from '../components/Layout'
import { dateFilter } from '../util/tool'

class Contact extends Component {
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
            <div className="do-content-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="do-group">
                        <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
                            type="text" className="do-input" placeholder="你的名字" required />
                    </div>
                    <div className="do-group">
                        <textarea value={this.state.content} onChange={e => this.setState({ content: e.target.value })} style={{ height: '300px' }}
                            type="text" className="do-input" placeholder="想说的话" required></textarea>
                    </div>
                    <div className="do-group">
                        <button className="do-btn primary-btn" disabled={!this.state.name || !this.state.content}>提交</button>
                    </div>
                </form>

                <div>
                    <ul className="do-list">
                        {
                            this.state.leaveWords.map((word, index) =>
                                <li key={index} className="do-list-item">
                                    <div>
                                        {index + 1} 楼
                                    <span className="do-pull-right"> {dateFilter(word.created)} </span>
                                    </div>
                                    <div className="do-title">{word.content}</div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default withLayout(Contact);
