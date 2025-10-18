import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(dto: UserDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        name: dto.name,
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
