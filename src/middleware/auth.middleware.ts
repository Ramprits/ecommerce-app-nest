/*
https://docs.nestjs.com/middleware#middleware
*/

import { ExpressRequest } from '@app/types/ExpressRequest';
import { UserService } from '@app/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequest, res: Response, next: Function) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, 'random');
      const user = await this.userService.findById(decode.user_id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
