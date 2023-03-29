import { Router } from "express";
import { IRequest, IResponse } from "../../interfaces";

const router = Router();

export default () => {
  router.get("/", (req: IRequest, res: IResponse) => {
    res.send("Hello World");
  });

  return router;
}