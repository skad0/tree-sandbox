import React, { Component } from 'react';

import './App.css';

import Tree from './Tree';
import flatten from './helpers/flattenTree';

const nodes = {
    id: 1,
    title: 'Root node',
    payload: {},
    folder: true,
    children: [
        {
            id: 2,
            title: 'First Child',
            payload: {},
            folder: true,
            children: [
                {
                    id: 5,
                    title: 'Grand Child',
                    payload: {},
                    folder: false,
                    children: []
                }
            ]
        },
        {
            id: 3,
            title: 'Second Child',
            payload: {},
            folder: false,
            children: []
        }
    ]
};

function mySuperNode(node, { isExpanded, isSelected }) {
    return (<div style={{display: 'inline-block'}}>
        {isExpanded && <span style={{color: 'red'}}>HA</span>}
        <span>{node.title}</span>
    </div>);
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: flatten(nodes),
            selectedNodes: [],
            expandedNodes: []
        };
    }

    _handleExpandedNodesChanged = (expandedNodes) => {
        this.setState({expandedNodes});
    }

    _handleSelectedNodesChanged = (selectedNodes) => {
        this.setState({selectedNodes});
    }

    render() {
        return (
            <div className="App">
                <Tree nodes={this.state.nodes}
                      selectedNodes={this.state.selectedNodes}
                      expandedNodes={this.state.expandedNodes}
                      onExpandedNodesChanged={this._handleExpandedNodesChanged}
                      onSelectedNodesChanged={this._handleSelectedNodesChanged}
                />
            </div>
        );
    }
}

export default App;
