import { ApiPropertyOptional } from '@nestjs/swagger';

export interface IEventQuery {
  state: string;
  city: string;
  cep: string;
  number: number;
  street: string;
  responsible: string;
  email: string;
  phone: string;
  name: string;
  zipCode: string;
}

export class EventQueryDTO {
  @ApiPropertyOptional()
  state: string;

  @ApiPropertyOptional()
  city: string;

  @ApiPropertyOptional()
  cep: string;

  @ApiPropertyOptional()
  number: number;

  @ApiPropertyOptional()
  street: string;

  @ApiPropertyOptional()
  responsible: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  zipCode: string;
}
