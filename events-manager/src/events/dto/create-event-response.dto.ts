import { OmitType } from "@nestjs/swagger";
import { FindEventDto } from "./find-event.dto";

export class CreateEventResponseDto extends OmitType(FindEventDto, ['images']) {}
