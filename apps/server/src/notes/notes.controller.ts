import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { User } from '../auth/decorators/user.decorator.js';
import { Profile as UserEntity } from '../../generated/prisma/client.js';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@User() user: UserEntity, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto, user.id);
  }

  @Get()
  findAll(
    @User() user: UserEntity,
    @Query('sort') sort: 'createdAt' | 'updatedAt' | 'title',
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.notesService.findAll(user.id, sort, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
