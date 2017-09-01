const _ = require('lodash');

module.exports = (node, options = {}) => {
    _.defaults(options, {
        payloadField: 'payload',
        childrenField: 'children'
    });

    function buildList(node, list, parentId) {
        // add all keys, except children to avoid data multiplying
        list.push(buildElement(node, parentId));

        (node[options.childrenField] || []).forEach(child => buildList(child, list, node.id));

        return list;
    }

    function buildElement(node, parentId) {
        const defaultFields = ['id', 'title', 'folder'];
        const { payloadField, childrenField } = options;

        return Object.assign(
            _.pick(node, defaultFields),
            {
                parentId: parentId,
                expandable: Boolean(node[childrenField] && node[childrenField].length > 0),
                [payloadField]: Object.assign(
                    _.omit(node, [...defaultFields, childrenField, payloadField]),
                    node[options.payloadField]
                )
            }
        );
    }

    return buildList(node, []);
};


