-- N404ErrorHandler SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "N404ErrorHandler",
      slug = "n404-error-handler",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "http://ccdb.hemiola.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["error_handling"] = {},
      },
    },
    entity = {
      ["error_handling"] = {
        ["fields"] = {
          {
            ["name"] = "causes",
            ["short"] = "Potential causes for the 404 error",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "solutions",
            ["short"] = "Suggested solutions to fix the error",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "timestamp",
            ["short"] = "Timestamp when the error was recorded",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["short"] = "The requested URL that returned 404",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "error_handling",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "referrer",
                      ["orig"] = "referrer",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "url",
                      ["orig"] = "url",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/404",
                ["parts"] = {
                  "404",
                },
                ["select"] = {
                  ["exist"] = {
                    "referrer",
                    "url",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
