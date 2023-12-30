import { Response, NextFunction } from 'express';
import jwt, { VerifyErrors, Secret } from 'jsonwebtoken';
import AuthRequest from '../lib/decorator/request';
import User from '../lib/interface/User.interface';
import { errorResponse } from '../lib/service/ErrorResponse';

const permission =
	(roles: string[]) =>
	async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
		try {
			const token: string | undefined = req.headers.authorization;
			if (!token) {
				return res.status(404).json(errorResponse('Token not found'));
			}

			// decode token
			const splitToken: string | undefined = token.split(' ')[1];
			if (!splitToken) {
				return res.status(401).json(errorResponse('Invalid token format'));
			}

			const jwtSecret: Secret = process.env.SECRET as Secret;

			jwt.verify(splitToken, jwtSecret, (err: VerifyErrors | null, decode: User) => {
				if (err) {
					return res.status(401).json(errorResponse('You have no permissions to access'));
				}

				const userRole = decode.role;
				if (roles.indexOf(userRole) === -1) {
					return res.status(401).json(errorResponse('You have no permissions to access'));
				}
				req.user = decode;
				next();
			});
		} catch (error) {
			res.status(501).json({ message: error.message });
		}
	};

export default permission;
