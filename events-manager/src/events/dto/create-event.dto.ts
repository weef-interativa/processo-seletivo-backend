import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";


export class CreateEventDto {

		@ApiProperty({ example: "2022-07-11T20:52:00.766Z" })
		@IsNotEmpty({ message: "O campo eventDate é obrigatório." })
    eventDate: string;

		@ApiProperty({ example: "Show do Metallica" })
		@IsNotEmpty({ message: "O campo name é obrigatório." })
    name: string;

		@ApiProperty({ example: "São Paulo" })
		@IsNotEmpty({ message: "O campo city é obrigatório." })
    city: string;

		@ApiProperty({ example: "SP" })
		@IsNotEmpty({ message: "O campo state é obrigatório." })
		@Length(2, 2, { message: "O campo state precisa ter 2 caracteres." })
    state: string;

		@ApiProperty({ example: "Av. Francisco Matarazzo" })
		@IsNotEmpty({ message: "O campo address é obrigatório." })
    address: string;

		@ApiProperty({ example: "Allianz Parque", nullable: true })
    complement: string;

		@ApiProperty({ example: "contato@supershows.com.br" })
		@IsNotEmpty({ message: "O campo email é obrigatório." })
		@IsEmail({ message: "O campo email precisa ser um e-mail válido." })
    email: string;

		@ApiProperty({ example: "11954322345" })
		@IsNotEmpty({ message: "O campo fone é obrigatório." })
		@Length(10, 11, { message: "O campo fone precisa ter entre 10 e 11 caracteres." })
		fone: string;

		@ApiProperty({ example: "707ddf2b-2365-4197-9e62-79d7a02575c1" })
		@IsNotEmpty({ message: "O campo responsableId é obrigatório." })
		@IsUUID(4, {message: "O campo responsableId precisa ser um UUID válido."})
    responsableId: string;
}
