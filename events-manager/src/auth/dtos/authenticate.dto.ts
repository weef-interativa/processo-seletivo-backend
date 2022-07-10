import { ApiProperty } from "@nestjs/swagger";

export class AuthenticateDto {

	@ApiProperty({ example: "gui.sartori96@gmail.com" })
	email: string;

	@ApiProperty({ example: "123abC45" })
	password: string;
}
