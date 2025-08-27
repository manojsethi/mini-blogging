import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content?: string;
}
