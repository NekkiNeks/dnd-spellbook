import { Response } from "express";
import response from "./responseWrapper";

export function handleError(res: Response, arg: unknown, statusCode?: number) {
    if (arg instanceof Error) {
        const data = { name: arg.name, message: arg.message }
        // TODO: Подумать над дефолтным значением статуса. 500 или 400?
        return response(res, false, data, statusCode ?? 500)
    } else {
        const name = 'Unknown Internal Server Error'
        const message = 'Unknown Error is happened on server side.'
        const data = { name, message }
        return response(res, false, data, 500)
    }
}
