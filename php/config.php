<?php
declare(strict_types=1);

// N404ErrorHandler SDK configuration

class N404ErrorHandlerConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "N404ErrorHandler",
                "slug" => "n404-error-handler",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "http://ccdb.hemiola.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "error_handling" => [],
                ],
            ],
            "entity" => [
        'error_handling' => [
          'fields' => [
            [
              'name' => 'causes',
              'short' => 'Potential causes for the 404 error',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'solutions',
              'short' => 'Suggested solutions to fix the error',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'Timestamp when the error was recorded',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'The requested URL that returned 404',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'error_handling',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'referrer',
                        'orig' => 'referrer',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'url',
                        'orig' => 'url',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/404',
                  'parts' => [
                    '404',
                  ],
                  'select' => [
                    'exist' => [
                      'referrer',
                      'url',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return N404ErrorHandlerFeatures::make_feature($name);
    }
}
