import { NextFunction, Router } from "express";
import { body, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../interfaces";
import Contact from "../../models/Contact";
import controller from './controller';

const router = Router();

export default function () {
  router.get("/", async (req: IRequest, res: IResponse) => {
    const user = req.user!;

    const contacts = await Contact.find({ user: user.id });

    return res.status(200).json({
      message: "Contacts fetched",
      data: { contacts },
    });
  });

  router.post('/',
    body('name').isString().trim().notEmpty().bail(),
    body('email').isEmail().normalizeEmail().bail(),
    body('tel').optional(),
    body('tel.mobile').optional().isArray().withMessage('Mobile phone numbers must be an array of numbers'),
    body('tel.work').optional().isArray().withMessage('Work phone numbers must be an array of numbers'),
    body('tel.home').optional().isArray().withMessage('Home phone numbers must be an array of numbers'),

    body('address').optional(),
    body(['address.street', 'address.city', 'address.state', 'address.zip', 'address.country']).isString().trim().notEmpty().bail(),
    async (req: IRequest, res: IResponse, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid data", data: errors.array() });
      }

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    }, controller.createContact);

  router.patch('/:id',
    body('name').isString().trim().notEmpty().bail(),
    body('email').isEmail().normalizeEmail().bail(),
    body('tel').optional(),
    body('tel.mobile').optional().isArray().withMessage('Mobile phone numbers must be an array of numbers'),
    body('tel.work').optional().isArray().withMessage('Work phone numbers must be an array of numbers'),
    body('tel.home').optional().isArray().withMessage('Home phone numbers must be an array of numbers'),

    body('address').optional(),
    body(['address.street', 'address.city', 'address.state', 'address.zip', 'address.country']).isString().trim().notEmpty().bail(),
    controller.updateContact);

  router.delete('/:id', controller.deleteContact);

  return router;
}