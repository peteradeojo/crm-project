import { Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

export default () => {
  router.post('/login', body(['email', 'password']).exists(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.json({ message: 'Login successful' });
  });

  return router;
}