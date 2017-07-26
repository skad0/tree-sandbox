import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';

import Tree from './Tree';

const nodes = {
    id: 1,
    title: 'Root node',
    payload: {},
    children: [
        {
            id: 2,
            title: 'First Child',
            payload: {},
            children: [
                {
                    id: 5,
                    title: 'Grand Child',
                    payload: {},
                    children: []
                }
            ]
        },
        {
            id: 3,
            title: 'Second Child',
            payload: {},
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
            nodes: nodes,
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
            <div>
                <Tree nodes={this.state.nodes}
                      selectedNodes={this.state.selectedNodes}
                      expandedNodes={this.state.expandedNodes}
                      onExpandedNodesChanged={this._handleExpandedNodesChanged}
                      onSelectedNodesChanged={this._handleSelectedNodesChanged}
                />

                <Tree nodes={this.state.nodes}
                      selectedNodes={this.state.selectedNodes}
                      expandedNodes={this.state.expandedNodes}
                      onExpandedNodesChanged={this._handleExpandedNodesChanged}
                      onSelectedNodesChanged={this._handleSelectedNodesChanged}
                      renderNodeContent={mySuperNode}
                />
            </div>
        );
    }
}

export default App;
