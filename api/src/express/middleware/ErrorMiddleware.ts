import {Request, Response, NextFunction} from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: Response) => {
    return res.status(500).json({
        status: 'error',
        message: err.message
    });
}