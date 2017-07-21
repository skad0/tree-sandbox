import React, {Component} from 'react';
import _ from 'lodash';
import './Tree.css';

export default class Tree extends Component {

    constructor(props) {
        super(props);
    }

    handleExpanderClick = (e) => {
        const nodeId = Number(e.target.dataset.nodeId);
        const wasExpanded = this.props.expandedNodes.includes(nodeId);
        const expandedNodes = wasExpanded
            ? _.without(this.props.expandedNodes, nodeId)
            : _.union(this.props.expandedNodes, [nodeId]);
        this.props.onExpandedNodesChanged(expandedNodes);
    }

    _renderNode({id, title, children}) {
        const isExpanded = this.props.expandedNodes.includes(id);
        const isExpandable = children.length > 0;
        const nodeDataAttrs = {
            'data-node-id': id
        };

        return <div className="tree__node" key={id}>
            <div className="tree__expander" onClick={this.handleExpanderClick} {...nodeDataAttrs}>
                {isExpandable && (isExpanded ? '-' : '+')}
            </div>
            <span>{title}</span>
            {isExpanded && children.map(child => this._renderNode(child))}
        </div>;
    }

    render() {
        return <div>
            {this._renderNode(this.props.nodes)}
        </div>;
    }
}
