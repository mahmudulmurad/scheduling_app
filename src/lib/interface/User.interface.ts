import { Document } from 'mongoose';
import { Gender } from '../../../enum/Gender.enum';
import { Roles } from '../../../enum/Role.enum';
import { ActiveStatus } from '../../../enum/Active.enum';

interface User extends Document {
    name: string;
    email: string;
    phone: string;
    password?: string;
    gender: Gender;
    version: number;
    role: Roles;
    isActive: ActiveStatus;
  }
  
  export default User;