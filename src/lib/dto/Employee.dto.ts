import { Gender } from "../enum/Gender.enum";
import { ActiveStatus } from "../enum/Active.enum";
import { Roles } from "../enum/Role.enum";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class EmployeeCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @Length(6)
  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsEnum(Roles)
  @IsOptional()
  role: Roles;
}

export class EmployeeUpdateDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @Length(6)
  @IsOptional()
  password: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsEnum(Roles)
  @IsOptional()
  role: Roles;

  @IsEnum(ActiveStatus)
  @IsOptional()
  isActive: ActiveStatus;
}

export type EmployeeLoginDTO = Pick<EmployeeCreateDTO, "email" | "password">;
