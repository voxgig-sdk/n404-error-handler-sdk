# N404ErrorHandler SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "N404ErrorHandler",
            "slug": "n404-error-handler",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "http://ccdb.hemiola.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "error_handling": {},
            },
        },
        "entity": {
      "error_handling": {
        "fields": [
          {
            "name": "causes",
            "short": "Potential causes for the 404 error",
            "type": "`$ARRAY`",
          },
          {
            "name": "solutions",
            "short": "Suggested solutions to fix the error",
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "timestamp",
            "short": "Timestamp when the error was recorded",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "The requested URL that returned 404",
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/404",
                "segments": [
                  {
                    "lit": "404",
                  },
                ],
                "select": {
                  "exist": [
                    "referrer",
                    "url",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "404",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
