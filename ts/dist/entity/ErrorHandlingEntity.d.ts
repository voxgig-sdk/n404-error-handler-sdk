import { N404ErrorHandlerEntityBase } from '../N404ErrorHandlerEntityBase';
import type { N404ErrorHandlerSDK } from '../N404ErrorHandlerSDK';
import type { Control } from '../types';
import type { ErrorHandling, ErrorHandlingListMatch } from '../N404ErrorHandlerTypes';
declare class ErrorHandlingEntity extends N404ErrorHandlerEntityBase<ErrorHandling> {
    constructor(client: N404ErrorHandlerSDK, entopts: any);
    make(this: ErrorHandlingEntity): ErrorHandlingEntity;
    list(this: any, reqmatch?: ErrorHandlingListMatch, ctrl?: Control): Promise<ErrorHandlingEntity[]>;
}
export { ErrorHandlingEntity };
