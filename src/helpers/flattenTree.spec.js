import flatten from './flattenTree';

describe('flattenTree', function() {
    it('should correctly process all fields', function() {
        const input = {
            id: 1,
            title: 'Root node',
            payload: {},
            folder: true
        };
        const result = flatten(input);

        expect(result).toHaveLength(1);
        expect(result).toContainEqual(expect.objectContaining({
            id: 1,
            title: 'Root node',
            folder: true,
            expandable: false,
            parentId: undefined
        }));
    });

    it('should fill payload field with predefined and extra data', function() {
        const input = {
            id: 1,
            title: 'Root node',
            payload: { predefined: 'predef' },
            extra: 'extra',
            folder: true
        };
        const result = flatten(input);

        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('payload', { predefined: 'predef', extra: 'extra' });
        expect(result[0]).not.toHaveProperty('extra');
    });

    it('should respect custom payload field name', function() {
        const input = {
            id: 1,
            title: 'Root node',
            data: { predefined: 'predef' },
            extra: 'extra',
            folder: true
        };
        const result = flatten(input, { payloadField: 'data' });

        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('data', { predefined: 'predef', extra: 'extra' });
        expect(result[0]).not.toHaveProperty('extra');
        expect(result[0]).not.toHaveProperty('payload');
    });

    it('should set correct parentId for elements', function() {
        const commonTree = {
            id: 1,
            title: 'Root node',
            payload: {},
            folder: true,
            children: [
                {
                    id: 3,
                    title: 'Second Child',
                    payload: {},
                    folder: false
                }
            ]
        };
        const result = flatten(commonTree);

        expect(result).toHaveLength(2);
        expect(result).toContainEqual(expect.objectContaining({ parentId: 1, id: 3 }));
        expect(result).toContainEqual(expect.objectContaining({ parentId: undefined, id: 1 }));
    });

    it('should respect custom children field name', function() {
        const commonTree = {
            id: 1,
            title: 'Root node',
            payload: {},
            folder: true,
            descedants: [
                {
                    id: 3,
                    title: 'Second Child',
                    payload: {},
                    folder: false
                }
            ]
        };
        const result = flatten(commonTree, { childrenField: 'descedants' });

        expect(result).toHaveLength(2);
        expect(result).toContainEqual(expect.objectContaining({ parentId: 1, id: 3 }));
        expect(result).toContainEqual(expect.objectContaining({ parentId: undefined, id: 1 }));
    });
});
