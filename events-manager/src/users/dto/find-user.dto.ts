import { ApiResponseProperty } from "@nestjs/swagger";

export class FindUserDto {

	@ApiResponseProperty({ example: "707ddf2b-2365-4197-9e62-79d7a02575c1" })
	id: string;

	@ApiResponseProperty({ example: "gui.sartori96@gmail.com" })
	email: string;

	@ApiResponseProperty({ example: "Guilherme Sartori" })
	name: string;

	password: string;

	@ApiResponseProperty({ example: "2022-07-08T16:51:04.590Z" })
	createdAt: string;

	@ApiResponseProperty({ example: "2022-07-08T16:51:04.590Z" })
	updatedAt: string;
}
