import { IsString, IsNotEmpty, IsDateString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';

export class ShiftDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	startTime: string;

	@IsString()
	@IsNotEmpty()
	endTime: string;

	@IsDateString()
	@IsNotEmpty()
	date: string;
}

export class ShiftUpdateDTO {
	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	startTime: string;

	@IsString()
	@IsOptional()
	endTime: string;

	@IsDateString()
	@IsOptional()
	date: string;
}

export class AssignEmployeeDto {
	@IsString()
	@IsOptional()
	employeeId: string;
}
