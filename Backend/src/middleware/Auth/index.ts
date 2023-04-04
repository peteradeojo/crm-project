import { NextFunction } from "express"
import { IRequest, IResponse } from "../../interfaces"
import IUser from "../../models/User/.d";
import User from "../../models/User";
import { verify } from 'jsonwebtoken';

import RedisConnection from "../../controllers/redis"

export const validateToken = async (req: IRequest, res: IResponse, next: NextFunction) => {
  const bearerToken = req.headers.authorization?.split(" ")[1];
  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verify(bearerToken, process.env.JWT_SECRET!) as { id: string, iat: number, exp: number };
    // req.user = decoded as IUser;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export const rateLimit = async (req: IRequest, res: IResponse, next: NextFunction) => {
  const client = await RedisConnection.getClient();
  const key = req.user?._id || req.ip;
  const limit = 5;
  const windowMs = 60 * 1000;

  const current = await client.get(key);
  const remaining = current ? limit - parseInt(current) : limit;

  if (remaining <= 0) {
    return res.status(429).json({ message: "Too many requests" });
  }

  await client.incr(key);
  await client.expire(key, windowMs);

  res.set('X-RateLimit-Limit', `${limit}`);
  res.set('X-RateLimit-Remaining', `${remaining - 1}`);
  res.set('X-RateLimit-Reset', new Date(Date.now() + windowMs).toISOString());

  next();
}