import { IsNumber, IsString } from 'class-validator';

export class CreateEventImageDto {
  @IsNumber()
  eventId: number;

  @IsNumber()
  assetId: string;

  @IsString()
  fileName: string;

  @IsString()
  url: string;
}
