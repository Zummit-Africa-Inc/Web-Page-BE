import { BadRequest, NotFound, Ok } from './ResponseType';
export declare class RckgAppResponse {
    static Ok<Type>(data: Type, message?: string, status?: string | number): Ok<Type>;
    static OkFailue<Type>(data: Type, message?: string, status?: string | number, errorCode?: string | number): Ok<Type>;
    static BadRequest(error: unknown, message?: string, errorCode?: string, status?: string): BadRequest;
    static NotFoundRequest(error: unknown, message?: string, errorCode?: string, status?: string): NotFound;
}
