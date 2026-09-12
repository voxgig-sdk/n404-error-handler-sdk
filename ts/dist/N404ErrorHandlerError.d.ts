import { Context } from './Context';
declare class N404ErrorHandlerError extends Error {
    isN404ErrorHandlerError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { N404ErrorHandlerError };
