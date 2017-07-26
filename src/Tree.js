import React, {Component} from 'react';
import _ from 'lodash';

import Checkbox from './Checkbox';

import './Tree.css';

export default class Tree extends Component {

    _helperKakoyto(elementsArray, element) {
        return elementsArray.includes(element)
            ? _.without(elementsArray, element)
            : _.union(elementsArray, [element]);
    }

    _handleExpanderClick = (e) => {
        const nodeId = Number(e.target.dataset.nodeId);

        this.props.onExpandedNodesChanged(
            this._helperKakoyto(this.props.expandedNodes, nodeId)
        );
    }

    _handleNodeCheckChange = (e) => {
        const nodeId = Number(e.target.value);

        this.props.onSelectedNodesChanged(
            this._helperKakoyto(this.props.selectedNodes, nodeId)
        );
    }

    _renderNode({id, title, children}) {
        const isExpanded = this.props.expandedNodes.includes(id);
        const isExpandable = children.length > 0;
        const nodeDataAttrs = {
            'data-node-id': id
        };

        return <div className="tree__node" key={id}>
            <div className="tree__expander" onClick={this._handleExpanderClick} {...nodeDataAttrs}>
                {isExpandable && (isExpanded ? '-' : '+')}
            </div>
            <Checkbox
                value={id}
                checked={this.props.selectedNodes.includes(id)}
                onChange={this._handleNodeCheckChange} />
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
