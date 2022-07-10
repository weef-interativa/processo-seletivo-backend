import { ApiResponseProperty } from "@nestjs/swagger";
import { Image } from "src/images/entities/image.entity";
import { FindUserDto } from "src/users/dto/find-user.dto";
import { User } from "src/users/entities/user.entity";

export class FindEventDto {
		@ApiResponseProperty({ example: "Rua Felicio Rossi" })
		address: string;

		@ApiResponseProperty({ example: "Vinhedo" })
		city: string;

		@ApiResponseProperty({ example: "" })
		complement: string;

		@ApiResponseProperty({ example: "gui.sartori96@gmail.com" })
		email: string;

		@ApiResponseProperty({ example: "2022-07-12T20:52:00.766Z" })
		eventDate: string;

		@ApiResponseProperty({ example: "19995545043" })
		fone: string;

		@ApiResponseProperty({ example: "Super Show da Claudia Leite" })
		name: string;

		@ApiResponseProperty({ example: "SP" })
		state: string;

		@ApiResponseProperty({ example: {
			id: "707ddf2b-2365-4197-9e62-79d7a02575c1",
			email: "gui.sartori96@gmail.com",
			name: "Guilherme Sartori",
			createdAt: "2022-07-08T16:51:04.590Z",
			updatedAt: "2022-07-08T16:51:04.590Z"
		 } })
		responsable: User;

		@ApiResponseProperty({ example: [{
			id: "cff165d7-95b4-409d-8656-33bd5d9206e6",
			path: "files/1657409989776.jpg",
			createdAt: "2022-07-10T02:39:49.838Z",
			updatedAt: "2022-07-10T02:39:49.838Z"
		 }] })
		images: Image[]

		@ApiResponseProperty({ example: "213c75d9-9c44-47ad-b195-936b93ec8f6e" })
		id: string;

		@ApiResponseProperty({ example: "2022-07-10T20:39:15.501Z" })
		createdAt: string;

		@ApiResponseProperty({ example: "2022-07-10T20:39:15.501Z" })
		updatedAt: string;
}
