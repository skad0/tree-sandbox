import React, {Component} from 'react';
import _ from 'lodash';

import Checkbox from './Checkbox';

import './Tree.css';

function helperKakoyto(elementsArray, element) {
    return elementsArray.includes(element)
        ? _.without(elementsArray, element)
        : _.union(elementsArray, [element]);
}

function RenderNodeContent(node) {
    return <span>{node.title}</span>;
}

export default class Tree extends Component {

    static defaultProps = {
        renderNodeContent: RenderNodeContent
    };

    _handleExpanderClick = (e) => {
        const nodeId = Number(e.target.dataset.nodeId);

        this.props.onExpandedNodesChanged(
            helperKakoyto(this.props.expandedNodes, nodeId)
        );
    }

    _handleNodeCheckChange = (e) => {
        const nodeId = Number(e.target.value);

        this.props.onSelectedNodesChanged(
            helperKakoyto(this.props.selectedNodes, nodeId)
        );
    }

    _renderNode(node) {
        const {id, children} = node;
        const isSelected = this.props.selectedNodes.includes(id);
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
                checked={isSelected}
                onChange={this._handleNodeCheckChange} />
            {this.props.renderNodeContent(node, { isSelected, isExpanded })}
            {isExpanded && children.map(child => this._renderNode(child))}
        </div>;
    }

    render() {
        return <div>
            {this._renderNode(this.props.nodes)}
        </div>;
    }
}
