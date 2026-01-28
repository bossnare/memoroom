import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsObject()
  @IsNotEmpty()
  jsonContent!: any;

  @IsString()
  @IsOptional()
  color?: string;
}
