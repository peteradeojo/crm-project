import { NextFunction, Router } from "express";
import { body, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../interfaces";
import Contact from "../../models/Contact";
import controller from "./controller";
import { validateRequestData } from "../../middleware";
import RedisConnection from "../../controllers/redis";

const debug = require("debug")("app:contacts-route");

const router = Router();

export default function () {
  router.get("/", async (req: IRequest, res: IResponse) => {
    const user = req.user!;
    const client = await RedisConnection.getClient();
    let data = await client.get(`${user.id}-contacts`);

    let contacts;

    if (!data) {
      contacts = await Contact.find({ user: user.id }).populate("notes");
      await client.set(`${user.id}-contacts`, JSON.stringify(contacts), {
        EX: 30,
      });
    } else {
      contacts = JSON.parse(data);
    }

    return res.status(200).json({
      message: "Contacts fetched",
      data: { contacts },
    });
  });

  router.post(
    "/",
    body("name").isString().trim().notEmpty().bail(),
    body("email").isEmail().normalizeEmail().bail(),
    body("tel").optional(),
    body("tel.mobile").optional().isArray().withMessage("Mobile phone numbers must be an array of numbers"),
    body("tel.work").optional().isArray().withMessage("Work phone numbers must be an array of numbers"),
    body("tel.home").optional().isArray().withMessage("Home phone numbers must be an array of numbers"),

    body("address").optional(),
    body(["address.street", "address.city", "address.state", "address.zip", "address.country"])
      .isString()
      .trim()
      .notEmpty()
      .bail(),
    validateRequestData,
    controller.createContact
  );

  router.patch(
    "/:id",
    body("name").isString().trim().notEmpty().bail(),
    body("email").isEmail().normalizeEmail().bail(),
    body("tel").optional(),
    body("tel.mobile").optional().isArray().withMessage("Mobile phone numbers must be an array of numbers"),
    body("tel.work").optional().isArray().withMessage("Work phone numbers must be an array of numbers"),
    body("tel.home").optional().isArray().withMessage("Home phone numbers must be an array of numbers"),

    body("address").optional(),
    body(["address.street", "address.city", "address.state", "address.zip", "address.country"])
      .isString()
      .trim()
      .notEmpty()
      .bail(),
    validateRequestData,
    controller.updateContact
  );

  router.post(
    "/:id/notes",
    body("title").isString().trim().isLength({ max: 64 }).notEmpty().bail(),
    body("text").isString().trim().isLength({ max: 2048 }).notEmpty().bail(),
    validateRequestData,
    controller.addNoteToContact
  );

  router.delete("/:id", controller.deleteContact);

  return router;
}
