import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInformeDto {
  @IsNotEmpty()
  actividad: string;

  @IsNumber()
  @IsNotEmpty()
  gastosTransporte: number;

  @IsDateString()
  @IsNotEmpty()
  fecha: string; // La fecha llega como string (ISO-8601)

  @IsInt()
  @IsNotEmpty()
  iglesiaId: number;
}

export class UpdateInformeDto {
  @IsString()
  actividad?: string;

  @IsNumber()
  gastosTransporte?: number;
}
