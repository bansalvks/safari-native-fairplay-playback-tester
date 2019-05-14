module.exports = {
    parser: 'babel-eslint',
    globals: { workbox: true },
    env: {
        jest: true,
        jasmine: true,
        es6: true,
        browser: true,
        worker: true,
        node: true,
    },
    rules: {
        // 'key-spacing' : [2, {
        //     singleLine : {
        //         beforeColon : false,
        //         afterColon  : true,
        //     },
        //     multiLine : {
        //         beforeColon : true,
        //         afterColon  : true,
        //         align       : 'colon',
        //     },
        // }],
        curly: [
            'error',
            'all',
        ],
        indent: [2, 4, { SwitchCase: 1 }],
        'max-len': ['error', {
            code: 500,
            comments: 500,
        }],
        'no-underscore-dangle': ['error',
            {
                allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', '__REDUX_DEVTOOLS_EXTENSION__'],
            },
        ],
        'jsx-a11y/media-has-caption': [1, {
            audio: ['Audio'],
            video: ['Video'],
            track: ['Track'],
        }],
        'brace-style': ['error', 'stroustrup'],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-console': 'off',
        'no-restricted-syntax': [
            'warn',
            {
                selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(debug|error|trace)$/]",
                message: 'Unexpected property on console object was called',
            },
        ],
    },
};
