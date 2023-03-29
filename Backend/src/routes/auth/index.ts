import { Router } from "express";
import { body, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../interfaces";
import { sign, verify } from "jsonwebtoken";

import User from "../../models/User";

const router = Router();

export default () => {
  router.post('/login',
    body(['email', 'password']).isString().trim(),
    async (req: IRequest, res: IResponse) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ data: errors.array(), message: errors.array()[0].msg });
      }

      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ message: "No user exists with this email." });
      }

      const isMatch = user.comparePassword(req.body.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = sign({ id: user._id }, process.env.JWT_SECRET!,
        {
          expiresIn: process.env.JWT_EXPIRES_IN!
        }
      );

      return res.json({ message: 'Login successful', data: { user, token } });
    });

  router.post('/register',
    body(['name', 'email', 'password']).isString().trim(),
    async (req: IRequest, res: IResponse) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ data: errors.array(), message: errors.array()[0].msg });
      }

      const { name, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res.status(419).json({
          message: 'User already exists with this email.'
        });
      }

      user = await User.create({
        name,
        email,
        password,
        provider: 'local'
      });

      const token = sign({ id: user._id }, process.env.JWT_SECRET!,
        {
          expiresIn: process.env.JWT_EXPIRES_IN!
        }
      );

      return res.json({ message: 'User created successfully', data: { user, token } });
    }
  );

  return router;
}