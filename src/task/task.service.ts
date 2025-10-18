import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  private tasks = [
    {
      id: 1,
      title: 'First Task',
      description: 'This is the first task',
      isDone: false,
    },
  ];

  async getTask() {
    return await this.prisma.task.findMany();
  }

  async create(dto: TaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.name,
        description: dto.description,
        isDone: false,
        user: {
          connect: { id: dto.userId },
        },
      },
    });
  }

  async updateTask(id: string) {
    const task = await this.prisma.task.update({
      where: { id: Number(id) },
      data: { isDone: true },
    });
    return task;
  }
}
