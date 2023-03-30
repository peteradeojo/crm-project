import { Router } from 'express';
import { IResponse, IRequest } from '../../interfaces';

import Company from '../../models/Company';
import IContact from '../../models/Contact/.d';

const router = Router();

export default () => {
  router.get('/', async (req: IRequest, res: IResponse) => {
    if (!req.user) {
      res.status(401).json({message: "Unauthorized"});
    }

    try {
      const companies = await Company.find({user: req.user!._id}).populate<{contacts: IContact[]}>('contacts');

      return res.json({message: "Success", data: companies});
    } catch (err) {
      return res.status(500).json({message: "Internal Server Error"});
    }
  });

  router.post('/', async (req: IRequest, res: IResponse) => {});

  router.put('/:id', async (req: IRequest, res: IResponse) => {});

  return router;
}