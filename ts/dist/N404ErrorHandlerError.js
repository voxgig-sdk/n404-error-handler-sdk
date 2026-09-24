"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N404ErrorHandlerError = void 0;
class N404ErrorHandlerError extends Error {
    isN404ErrorHandlerError = true;
    sdk = 'N404ErrorHandler';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.N404ErrorHandlerError = N404ErrorHandlerError;
//# sourceMappingURL=N404ErrorHandlerError.js.map