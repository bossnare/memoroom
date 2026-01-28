import { IsString, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsJSON()
  @IsNotEmpty()
  jsonContent!: any;

  @IsString()
  @IsOptional()
  color?: string;
}
