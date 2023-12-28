import { Request } from 'express';
import User from '../interface/User.interface';

interface AuthRequest extends Request {
  user?: User;
}

export default AuthRequest;
