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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "causes", "req": false, "short": "Potential causes for the 404 error", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "solutions", "req": false, "short": "Suggested solutions to fix the error", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "format": "date-time", "name": "timestamp", "req": false, "short": "Timestamp when the error was recorded", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "url", "req": false, "short": "The requested URL that returned 404", "type": "`$STRING`", "index$": 3 }], "name": "error_handling", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "referrer", "orig": "referrer", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "url", "orig": "url", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /404", "json": "{\"operationId\":\"get404ErrorInfo\",\"parameters\":[{\"description\":\"The URL that resulted in a 404 error\",\"in\":\"query\",\"name\":\"url\",\"required\":false,\"schema\":{\"format\":\"uri\",\"type\":\"string\"}},{\"description\":\"The referring URL where the broken link was found\",\"in\":\"query\",\"name\":\"referrer\",\"required\":false,\"schema\":{\"format\":\"uri\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"causes\":[\"Page has been moved or deleted\",\"URL may contain a typo\",\"Link is outdated\"],\"solutions\":[\"Check for redirects or updated URLs\",\"Verify spelling in the URL\",\"Use site search to find the content\"],\"timestamp\":\"2024-01-15T12:00:00Z\",\"url\":\"https://example.com/missing-page\"},\"schema\":{\"properties\":{\"causes\":{\"description\":\"Potential causes for the 404 error\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"solutions\":{\"description\":\"Suggested solutions to fix the error\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"timestamp\":{\"description\":\"Timestamp when the error was recorded\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"The requested URL that returned 404\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with 404 error analysis\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/404", "segments": [{ "lit": "404" }], "select": { "exist": ["referrer", "url"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "error_handling", "name__orig": "error_handling", "Name": "ErrorHandling", "name_": "error_handling", "name-": "error-handling", "NAME": "ERROR_HANDLING", "index$": 0 }, { "active": true, "entity": "error_handling", "key$": "BasicErrorHandlingFlow", "kind": "basic", "name": "BasicErrorHandlingFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "error_handling_ref01" } }], "index$": 0 }] }, 'ErrorHandling');
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