import { ErrorType } from "@/models/error"
import { NextApiResponse } from "next"

export function handleError(error: unknown, res: NextApiResponse) {
    let err_REQUEST: ErrorType
    if (error instanceof Error) {
        err_REQUEST = {
            err_msg: error.message
        }
    } else {
        err_REQUEST = {
            err_msg: "Unknown error"
        }
    }
    res.status(404).json(err_REQUEST)
}