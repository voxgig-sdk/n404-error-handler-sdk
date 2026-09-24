
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { N404ErrorHandlerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = N404ErrorHandlerSDK.test()
    equal(testsdk instanceof N404ErrorHandlerSDK, true,
      'N404ErrorHandlerSDK.test() must return a client synchronously')
  })

})
