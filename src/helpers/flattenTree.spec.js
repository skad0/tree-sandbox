const assert = require('assert');
const flatten = require('./flattenTree');
// TODO: write tests with infrastucture
const commonTree = {
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
            payload: { chmod: '777' },
            owner: 'admin',
            folder: false,
            children: []
        }
    ]
};
const commonResult = [
    {
        id: 1,
        title: 'Root node',
        folder: true,
        parentId: undefined,
        expandable: true,
        payload: {}
    },
    {
        id: 2,
        title: 'First Child',
        folder: true,
        parentId: 1,
        expandable: true,
        payload: {} },
    {
        id: 5,
        title: 'Grand Child',
        folder: false,
        parentId: 2,
        expandable: false,
        payload: {} },
    {
        id: 3,
        title: 'Second Child',
        folder: false,
        parentId: 1,
        expandable: false,
        payload: { owner: 'admin', chmod: '777' }
    }
];
const customPayload = {
    id: 1,
    title: 'folder',
    folder: false,
    additional: { owner: 'admin' },
    icon: 'arrow'
};
const customPayloadResult = [
    {
        id: 1,
        title: 'folder',
        folder: false,
        parentId: undefined,
        expandable: false,
        additional: { icon: 'arrow', owner: 'admin' }
    }
];

assert.deepEqual(flatten(commonTree), commonResult, 'should correctly build list with correct payloads');
assert.deepEqual(
    flatten(customPayload, { payloadField: 'additional' }),
    customPayloadResult,
    'should correctly process custom payload field'
);
