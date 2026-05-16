
import { Context } from './Context'


class N404ErrorHandlerError extends Error {

  isN404ErrorHandlerError = true

  sdk = 'N404ErrorHandler'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  N404ErrorHandlerError
}

