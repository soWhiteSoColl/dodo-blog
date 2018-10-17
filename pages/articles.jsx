import React from 'react';
import NotFound from '../components/404'

class Component extends React.Component {
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
            <NotFound/>
        );
    }
}

export default Component;
