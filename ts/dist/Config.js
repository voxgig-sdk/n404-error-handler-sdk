"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'N404ErrorHandler',
        slug: "n404-error-handler",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "http://ccdb.hemiola.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            error_handling: {},
        }
    };
    entity = {
        "error_handling": {
            "fields": [
                {
                    "name": "causes",
                    "short": "Potential causes for the 404 error",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "solutions",
                    "short": "Suggested solutions to fix the error",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "short": "Timestamp when the error was recorded",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "short": "The requested URL that returned 404",
                    "type": "`$STRING`"
                }
            ],
            "name": "error_handling",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "referrer",
                                        "orig": "referrer",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "url",
                                        "orig": "url",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/404",
                            "segments": [
                                {
                                    "lit": "404"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "referrer",
                                    "url"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "404"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map