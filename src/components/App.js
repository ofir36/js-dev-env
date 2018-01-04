import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
