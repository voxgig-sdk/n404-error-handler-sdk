# N404ErrorHandler SDK configuration

module N404ErrorHandlerConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "N404ErrorHandler",
        "slug" => "n404-error-handler",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "http://ccdb.hemiola.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "error_handling" => {},
        },
      },
      "entity" => {
        "error_handling" => {
          "fields" => [
            {
              "name" => "causes",
              "short" => "Potential causes for the 404 error",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "solutions",
              "short" => "Suggested solutions to fix the error",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "timestamp",
              "short" => "Timestamp when the error was recorded",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "The requested URL that returned 404",
              "type" => "`$STRING`",
            },
          ],
          "name" => "error_handling",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "referrer",
                        "orig" => "referrer",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "url",
                        "orig" => "url",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/404",
                  "parts" => [
                    "404",
                  ],
                  "select" => {
                    "exist" => [
                      "referrer",
                      "url",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    N404ErrorHandlerFeatures.make_feature(name)
  end
end
