import { Request, Response, Send } from "express-serve-static-core"
import IUser from "../models/User/.d";

export interface IResponse extends Response {
  json: Send<{
    status?: number,
    message: string,
    data?: any,
  } | null, this>
};

export interface IRequest extends Request {
  user?: IUser;
}