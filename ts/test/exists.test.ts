
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { N404ErrorHandlerSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await N404ErrorHandlerSDK.test()
    equal(null !== testsdk, true)
  })

})
