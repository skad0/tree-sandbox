import React, {Component} from 'react';
import _ from 'lodash';

import Checkbox from './TreeCheckbox';

import './Tree.css';

function findDescedants(nodeId, flatTree) {
    const children = flatTree.filter(node => node.parentId === nodeId);

    return children.reduce((acc, node) => {
        return [].concat(acc, findDescedants(node.id, flatTree));
    }, children);
}

function RenderNodeContent(node) {
    return <span>{node.title}</span>;
}

export default class Tree extends Component {

    static defaultProps = {
        renderNodeContent: RenderNodeContent
    };

    constructor(props) {
        super(props);

        this._renderFlatNode = this._renderFlatNode.bind(this);
    }

    _buildTree(node, tree, parentId) {
        const result = tree;
        // add all keys, except children to avoid data multiplying
        result.push(this._processNode(node, parentId));

        (node.children || []).forEach(child => this._buildTree(child, result, node.id));

        return result;
    }

    _processNode(node, parentId) {
        return Object.assign(
            _.pickBy(node, (value, key) => key !== 'children'),
            {
                parentId: parentId,
                expandable: node.children && node.children.length > 0
            }
        );
    }

    _handleExpanderClick = (e) => {
        const nodeId = Number(e.target.dataset.nodeId);

        this.props.onExpandedNodesChanged(
            this.props.expandedNodes.includes(nodeId) ?
                _.without(this.props.expandedNodes, nodeId) :
                _.union(this.props.expandedNodes, [nodeId])
        );
    }

    _handleNodeCheckChange = (e, value) => {
        const nodeId = Number(value);
        const selectedNodes = this.props.selectedNodes;
        const descedants = findDescedants(nodeId, this.props.nodes).map(node => node.id);

        this.props.onSelectedNodesChanged(
            _.includes(selectedNodes, nodeId) ?
                _.without(selectedNodes, ...descedants, nodeId) :
                _.union(selectedNodes, descedants, [nodeId])
        );
    }

    _renderFlatNode(node) {
        const {id, expandable} = node;
        const isExpanded = this.props.expandedNodes.includes(id);
        const isSelected = this.props.selectedNodes.includes(id);
        const status = isSelected ? 'checked' : 'unchecked';
        const nodeDataAttrs = {
            'data-node-id': id
        };

        return <div className="tree__node" key={id}>
            <div className="tree__expander" onClick={this._handleExpanderClick} {...nodeDataAttrs}>
                {expandable && (isExpanded ? '-' : '+')}
            </div>
            <Checkbox
                value={id}
                checked={isSelected}
                status={status}
                onChange={this._handleNodeCheckChange}>
                    {(node.folder === true) && '(F)'}
                    {this.props.renderNodeContent(node, { isSelected, isExpanded })}
            </Checkbox>
            {isExpanded && this._getNodeChildren(node).map(this._renderFlatNode)}
        </div>;
    }

    /**
     * Find node children
     *
     * @param {Object} node
     * @param {number} node.id - node identifier
     * @returns {Array}
     */
    _getNodeChildren(node) {
        return this.props.nodes.filter(n => n.parentId === node.id);
    }

    render() {
        return <div>
            {this.props.nodes.filter(node => !node.parentId).map(this._renderFlatNode)}
        </div>;
    }
}
