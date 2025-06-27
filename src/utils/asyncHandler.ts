import { Request, Response, NextFunction } from "express";

const asyncHandler =
  (fun: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fun(req, res, next);
    } catch (error: any) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };

export { asyncHandler };
