import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as any;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = verify(token, jwtConstants.secret);
        req['user'] = decoded;
      } catch (error) {
        throw new Error('Unauthorized user');
        // Handle invalid or expired tokens
        // You can choose to log the error or handle it in a different way
      }
    } else {
      throw new Error('Unauthorized User');
    }

    next();
  }
}
