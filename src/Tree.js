import React, {Component} from 'react';
import _ from 'lodash';

import Checkbox from './TreeCheckbox';

import './Tree.css';

function helperKakoyto(elementsArray, element) {
    return elementsArray.includes(element)
        ? _.without(elementsArray, element)
        : _.union(elementsArray, [element]);
}

function findNodeDescendants(nodeId, tree) {
    const start = findStartNode(tree, nodeId);

    return collectDescendantIds(start.children);
}

function collectDescendantIds(children) {
    return _.flatten(
        (children || [])
            .map(child => [child.id, ...collectDescendantIds(child.children)])
    );
}

function findStartNode(tree, nodeId) {
    if (tree.id === nodeId) {
        return tree;
    } else {
        let result = null;
        (tree.children || []).some(child => {
            const foundNode = findStartNode(child, nodeId);
            if(foundNode !== null) {
                result = foundNode;

                return true;
            }
        });

        return result;
    }
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

    _handleNodeCheckChange = (e, value) => {
        const nodeId = Number(value);
        const descendants = findNodeDescendants(nodeId, this.props.nodes);
        const wasChecked = _.includes(this.props.selectedNodes, nodeId);
        const newSelectedNodes = wasChecked
            ? _.without(this.props.selectedNodes, ...descendants, nodeId)
            : _.union(this.props.selectedNodes, descendants, [nodeId]);

        this.props.onSelectedNodesChanged(newSelectedNodes);
    }

    _renderNode(node) {
        const {id, children} = node;
        const isSelected = this.props.selectedNodes.includes(id);
        const isExpanded = this.props.expandedNodes.includes(id);
        const isExpandable = children.length > 0;
        const nodeDataAttrs = {
            'data-node-id': id
        };
        const status = isSelected ? 'checked' : 'unchecked';

        return <div className="tree__node" key={id}>
            <div className="tree__expander" onClick={this._handleExpanderClick} {...nodeDataAttrs}>
                {isExpandable && (isExpanded ? '-' : '+')}
            </div>
            <Checkbox
                value={id}
                checked={isSelected}
                status={status}
                onChange={this._handleNodeCheckChange}>
                    {(node.folder === true) && '(F)'}
                    {this.props.renderNodeContent(node, { isSelected, isExpanded })}
                    {isExpanded && children.map(child => this._renderNode(child))}
            </Checkbox>
        </div>;
    }

    render() {
        return <div>
            {this._renderNode(this.props.nodes)}
        </div>;
    }
}
