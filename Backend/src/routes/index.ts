import { Router } from "express";

import AuthRouter from "./auth";
import DashboardRouter from "./dashboard";
import ContactsRouter from "./contacts";

import { validateToken } from "../middleware/Auth";

const router = Router();

export default () => {
  router.use("/auth", AuthRouter());
  router.use("/dashboard", validateToken, DashboardRouter());
  router.use("/contacts", validateToken, ContactsRouter());

  return router;
};