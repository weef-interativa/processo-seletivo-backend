import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserDto {
		@ApiProperty({ example: "contato@novocliente.com.br" })
		@IsEmail({ message: "A propriedade email precisa ser um e-mail válido." })
		@IsNotEmpty({ message: "A propriedade email é obrigatória." })
    email: string;

		@ApiProperty({ example: "Guilherme Sartori" })
		@IsNotEmpty({ message: "A propriedade name é obrigatória." })
    name: string;

		@ApiProperty({ example: "SuperS3nh@" })
		@IsNotEmpty({ message: "A propriedade password é obrigatória." })
		@MinLength(8, { message: "O campo senha precisa ter pelo menos 8 dígitos." })
		@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'O campo password precisa ter pelo menos uma letra minúscula, uma letra maiúscula e um número.'})
    password: string;
}
