import { PrismaService } from './../prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNoteDto: CreateNoteDto, userId: string) {
    const createdNote = await this.prisma.note.create({
      data: {
        ...createNoteDto,
        user: {
          connect: { id: userId }, // within relations
        },
      },
    });

    return {
      success: true,
      timestamps: Date.now(),
      data: createdNote,
    };
  }

  async findAll(
    userId: string,
    sort: 'createdAt' | 'updatedAt' | 'title',
    order: 'asc' | 'desc',
  ) {
    const sortField = sort ?? 'updatedAt';
    const sortOrder = order ?? 'desc';

    const data = await this.prisma.note.findMany({
      where: { userId, deleted: false },
      orderBy: { [sortField]: sortOrder },
    });

    const count = data.length;

    return {
      success: true,
      timestamps: Date.now(),
      count,
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.note.findUnique({
      where: { id },
    });

    return {
      success: true,
      timestamps: Date.now(),
      data,
    };
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.prisma.note.update({
      where: { id },
      data: { ...updateNoteDto, edited: true, numberOfEdits: { increment: 1 } },
    });

    return {
      success: true,
      message: 'notes updated',
      timestamps: Date.now(),
    };
  }

  async softRemoveOne(id: string) {
    await this.prisma.note.update({
      where: { id },
      data: { deleted: true, deletedAt: new Date() },
    });

    return {
      success: true,
      message: 'Note moved to trash',
      timestamps: Date.now(),
    };
  }

  async softRemoveMany(idsToRemove: string[]) {
    if (!idsToRemove.length) {
      return {
        message: 'No id to remove!',
        idsToRemove: idsToRemove.length,
      };
    }
    const result = await this.prisma.note.updateMany({
      where: { id: { in: idsToRemove } },
      data: { deleted: true, deletedAt: new Date() },
    });

    return {
      success: true,
      message: 'Notes moved to trash',
      count: result.count,
      timestamps: Date.now(),
    };
  }

  async restoreOne(id: string) {
    await this.prisma.note.update({
      where: { id },
      data: { deleted: false },
    });

    return {
      success: true,
      message: 'Note restored',
      timestamps: Date.now(),
    };
  }

  async restoreMany(idsToRestore: string[]) {
    const result = await this.prisma.note.updateMany({
      where: { id: { in: idsToRestore } },
      data: { deleted: false },
    });

    return {
      success: true,
      message: 'Notes restored',
      count: result.count,
      timestamps: Date.now(),
    };
  }

  async removeOne(id: string) {
    await this.prisma.note.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Note permanently deleted',
      timestamps: Date.now(),
    };
  }

  async removeMany(idsToRemove: string[]) {
    const result = await this.prisma.note.deleteMany({
      where: { id: { in: idsToRemove } },
    });

    return {
      success: true,
      message: 'Note permanently deleted',
      count: result.count,
      timestamps: Date.now(),
    };
  }
}
