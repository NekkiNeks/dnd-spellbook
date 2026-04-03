import { Response } from "express";

export default function(res: Response, success: boolean, data: any, statusCode?: number) {
    return res.status(statusCode ?? 200).send({ success, data })
}
