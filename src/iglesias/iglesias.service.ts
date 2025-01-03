import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IglesiasService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllIglesias() {
    return this.prisma.iglesia.findMany({
      include: { distrito: true },
    });
  }

  async createIglesia(data: { nombreIglesia: string; distritoId: number }) {
    return this.prisma.iglesia.create({ data });
  }

  async getIglesiaById(id: number) {
    return this.prisma.iglesia.findUnique({
      where: { id },
      include: { distrito: true },
    });
  }

  async updateIglesia(id: number, data: { nombreIglesia?: string; distritoId?: number }) {
    return this.prisma.iglesia.update({
      where: { id },
      data,
    });
  }

  async deleteIglesia(id: number) {
    return this.prisma.iglesia.delete({ where: { id } });
  }
}
