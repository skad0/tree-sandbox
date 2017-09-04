import flatten from './flattenTree';
import _ from 'lodash';

const commonTree = {
    id: 1,
    title: 'Root node',
    payload: {},
    folder: true,
    children: [
        {
            id: 3,
            title: 'Second Child',
            payload: { chmod: '777' },
            owner: 'admin',
            folder: false
        }
    ]
};
const customChildren = Object.assign(
    _.omit(commonTree, ['children']),
    { descedants: [].concat(commonTree.children) }
);
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

const tests = [
    {
        input: commonTree,
        expected: commonResult,
        message: 'should correctly build list with correct payloads',
        options: {}
    },
    {
        input: customPayload,
        expected: customPayloadResult,
        message: 'should correctly process custom payload field',
        options: { payloadField: 'additional' }
    },
    {
        input: customChildren,
        expected: commonResult,
        message: 'should correctly process custom children field',
        options: { childrenField: 'descedants' }
    }
];

describe('flattenTree', function() {
    tests.forEach(t => {
        it(t.message, function() {
            expect(flatten(t.input, t.options)).toEqual(t.expected);
        });
    });
});
