import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ZonasService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllZonas() {
    return this.prisma.zona.findMany({
      include: { distritos: true },
    });
  }

  async createZona(data: { nombre: string; descripcion: string }) {
    return this.prisma.zona.create({ data });
  }

  async getZonaById(id: number) {
    return this.prisma.zona.findUnique({
      where: { id },
      include: { distritos: true },
    });
  }

  async updateZona(id: number, data: { nombre?: string; descripcion?: string }) {
    return this.prisma.zona.update({
      where: { id },
      data,
    });
  }

  async deleteZona(id: number) {
    return this.prisma.zona.delete({ where: { id } });
  }
}
