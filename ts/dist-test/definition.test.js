"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "error_handling",
        "accessor": "ErrorHandling",
        "op": "list",
        "method": "GET",
        "path": "/404",
        "args": [],
        "select": {
            "referrer": "v1",
            "url": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "url",
            "referrer"
        ],
        "queryArgs": [
            {
                "name": "referrer",
                "wire": "referrer"
            },
            {
                "name": "url",
                "wire": "url"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "url": "https://example.com/missing-page",
            "causes": [
                "Page has been moved or deleted",
                "URL may contain a typo",
                "Link is outdated"
            ],
            "solutions": [
                "Check for redirects or updated URLs",
                "Verify spelling in the URL",
                "Use site search to find the content"
            ],
            "timestamp": "2024-01-15T12:00:00Z"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map