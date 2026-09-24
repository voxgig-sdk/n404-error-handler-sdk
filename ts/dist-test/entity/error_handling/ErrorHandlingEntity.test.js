"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ErrorHandlingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when N404_ERROR_HANDLER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('N404_ERROR_HANDLER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.N404ErrorHandlerSDK.test();
        const ent = testsdk.ErrorHandling();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.N404_ERROR_HANDLER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'error_handling.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "causes": { "a": true, "h": "Causes", "n": "causes", "r": false, "sh": "Potential causes for the 404 error", "t": "`$ARRAY`", "key$": "causes", "index$": 0 }, "solutions": { "a": true, "h": "Solutions", "n": "solutions", "r": false, "sh": "Suggested solutions to fix the error", "t": "`$ARRAY`", "key$": "solutions", "index$": 1 }, "timestamp": { "a": true, "fo": "date-time", "h": "Timestamp", "n": "timestamp", "r": false, "sh": "Timestamp when the error was recorded", "t": "`$STRING`", "key$": "timestamp", "index$": 2 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "The requested URL that returned 404", "t": "`$STRING`", "key$": "url", "index$": 3 } }, "name": "error_handling", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /404", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "referrer", "or": "referrer", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "url", "or": "url", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/404", "q": { "exist": ["referrer", "url"] }, "r": {}, "s": [{ "lit": "404" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "error_handling", "name__orig": "error_handling", "Name": "ErrorHandling", "name_": "error_handling", "name-": "error-handling", "NAME": "ERROR_HANDLING", "index$": 0 }, { "active": true, "entity": "error_handling", "key$": "BasicErrorHandlingFlow", "kind": "basic", "name": "BasicErrorHandlingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "error_handling_ref01" } }], "index$": 0 }] }, 'ErrorHandling', { "GET /404": { "protocol": "http", "operationId": "get404ErrorInfo", "responses": { "200": { "description": "Successful response with 404 error analysis", "content": { "application/json": { "schema": { "type": "object", "properties": { "url": { "description": "The requested URL that returned 404", "key$": "url", "type": "string" }, "causes": { "description": "Potential causes for the 404 error", "items": { "type": "string" }, "key$": "causes", "type": "array" }, "solutions": { "description": "Suggested solutions to fix the error", "items": { "type": "string" }, "key$": "solutions", "type": "array" }, "timestamp": { "description": "Timestamp when the error was recorded", "format": "date-time", "key$": "timestamp", "type": "string" } }, "index$": 0 }, "example": { "url": "https://example.com/missing-page", "causes": ["Page has been moved or deleted", "URL may contain a typo", "Link is outdated"], "solutions": ["Check for redirects or updated URLs", "Verify spelling in the URL", "Use site search to find the content"], "timestamp": "2024-01-15T12:00:00Z" } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } } } } } }, "parameters": [{ "name": "url", "in": "query", "description": "The URL that resulted in a 404 error", "required": false, "schema": { "type": "string", "format": "uri" }, "index$": 0 }, { "name": "referrer", "in": "query", "description": "The referring URL where the broken link was found", "required": false, "schema": { "type": "string", "format": "uri" }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let error_handling_ref01_data = Object.values(setup.data.existing.error_handling)[0];
        // LIST
        const error_handling_ref01_ent = client.ErrorHandling();
        const error_handling_ref01_match = {};
        const error_handling_ref01_list = (await error_handling_ref01_ent.list(error_handling_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/error_handling/ErrorHandlingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.N404ErrorHandlerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['error_handling01', 'error_handling02', 'error_handling03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'N404_ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID': idmap,
        'N404_ERROR_HANDLER_TEST_LIVE': 'FALSE',
        'N404_ERROR_HANDLER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['N404_ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID'];
    const live = 'TRUE' === env.N404_ERROR_HANDLER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['N404_ERROR_HANDLER_TEST_ERROR_HANDLING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.N404ErrorHandlerSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.N404_ERROR_HANDLER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ErrorHandlingEntity.test.js.map