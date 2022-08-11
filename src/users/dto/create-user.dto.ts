import { IsBoolean, IsNumber, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;

  @IsBoolean()
  readonly male: boolean;

  @IsString()
  readonly role: string;

  @IsNumber()
  readonly height: number;

  @IsNumber()
  readonly weight: number;
}
