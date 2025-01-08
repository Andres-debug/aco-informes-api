import { IsOptional, IsIn, IsNumber } from 'class-validator';

export class GroupByInformeDto {
  @IsIn(['iglesiaId', 'iglesia.distritoId', 'iglesia.distrito.zonaId'], {
    message: 'El campo "groupBy" debe ser uno de: iglesiaId, iglesia.distritoId, iglesia.distrito.zonaId',
  })
  groupBy: 'iglesiaId' | 'iglesia.distritoId' | 'iglesia.distrito.zonaId';

  @IsOptional()
  @IsNumber({}, { message: 'zonaId debe ser un número' })
  zonaId?: number;

  @IsOptional()
  @IsNumber({}, { message: 'distritoId debe ser un número' })
  distritoId?: number;
}
