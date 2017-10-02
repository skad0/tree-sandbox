import React, { Component } from 'react';

import './TreeCheckbox.css';

const STATUS = {
    checked: 'checked',
    unchecked: 'unchecked',
    partlyChecked: 'partly-checked'
};

export default class TreeCheckbox extends Component {
    static defaultProps = {
        size: 's'
    };

    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(e) {
        e.preventDefault();

        this.props.onChange(e, this.props.value);
    }

    render() {
        const inputChecked = [STATUS.checked, STATUS.partlyChecked].includes(this.props.status);
        const size = this.props.size;

        return <label
            className={`tree-checkbox tree-checkbox_size_${size} tree-checkbox_${this.props.status}`}>
            <span className="tree-checkbox__box" onClick={this._handleClick}>
                <input
                    className="tree-checkbox__control"
                    type="checkbox"
                    autoComplete="off"
                    name={this.props.name}
                    value={this.props.value}
                    checked={inputChecked} />
            </span>
            <span className="tree-checkbox__text" role="presentation">
                {this.props.children}
            </span>
        </label>;
    }
}
