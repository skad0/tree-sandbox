import React, { Component } from 'react';

export default class Checkbox extends Component {
    render() {
        return <input type="checkbox"
            value={this.props.value}
            checked={this.props.checked}
            onChange={this.props.onChange} />
    }
}
