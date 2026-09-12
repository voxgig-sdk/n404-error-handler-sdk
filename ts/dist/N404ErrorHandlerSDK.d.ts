import { ErrorHandlingEntity } from './entity/ErrorHandlingEntity';
export type * from './N404ErrorHandlerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { N404ErrorHandlerEntityBase } from './N404ErrorHandlerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class N404ErrorHandlerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ErrorHandling(entopts?: Record<string, any>): ErrorHandlingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): N404ErrorHandlerSDK;
    tester(testopts?: any, sdkopts?: any): N404ErrorHandlerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof N404ErrorHandlerSDK;
export { stdutil, config, BaseFeature, N404ErrorHandlerEntityBase, N404ErrorHandlerSDK, SDK, };
