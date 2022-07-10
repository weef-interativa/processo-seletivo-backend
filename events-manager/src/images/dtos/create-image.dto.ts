import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateImageDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	photo: any;

	@ApiProperty({ example: "714718f7-fd52-48a8-8c28-1917b9b495ca" })
	@IsNotEmpty({ message: "A propriedade eventId é obrigatória." })
	@IsUUID(4, { message: "O campo eventId precisa ser um UUID válido." })
	eventId: string;
}
