import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Response } from "express";

export type sResponse = Response & {
  error200: (message: string) => void
}

export const sRes = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const res = ctx.switchToHttp().getResponse();
    res.error200 = (message: string) => {
      res.json({
        error: true,
        message,
      })
    }
    return res
  },
);