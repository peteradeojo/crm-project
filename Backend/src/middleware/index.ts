import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequestData = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ message: 'Invalid data', data: errors.array() });
	}
	next();
};
