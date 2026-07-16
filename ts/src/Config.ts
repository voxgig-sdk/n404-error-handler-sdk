
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'http://ccdb.hemiola.com',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      error_handling: {
      },

    }
  }


  entity = {
    "error_handling": {
      "fields": [
        {
          "active": true,
          "name": "caus",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "solution",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "timestamp",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "error_handling",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "referrer",
                    "orig": "referrer",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/404",
              "parts": [
                "404"
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
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

