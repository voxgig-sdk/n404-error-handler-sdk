package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "N404ErrorHandler",
			"slug": "n404-error-handler",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "http://ccdb.hemiola.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"error_handling": map[string]any{},
			},
		},
		"entity": map[string]any{
			"error_handling": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "causes",
						"short": "Potential causes for the 404 error",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "solutions",
						"short": "Suggested solutions to fix the error",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "timestamp",
						"short": "Timestamp when the error was recorded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "The requested URL that returned 404",
						"type": "`$STRING`",
					},
				},
				"name": "error_handling",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "referrer",
											"orig": "referrer",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "url",
											"orig": "url",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/404",
								"segments": []any{
									map[string]any{
										"lit": "404",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"referrer",
										"url",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"404",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
