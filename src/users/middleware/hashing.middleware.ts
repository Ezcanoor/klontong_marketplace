import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { hasPassword } from 'src/utils/bcrypt';

@Injectable()
export class HashingPassMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password;
    const hashedPass = await hasPassword(password);
    req.body.password = hashedPass;
    next();
  }
}
