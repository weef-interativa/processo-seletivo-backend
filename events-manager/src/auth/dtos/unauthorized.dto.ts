import { ApiResponseProperty } from "@nestjs/swagger";

export class UnauthorizedDto {
		@ApiResponseProperty({ example: 401 })
		statusCode: number;

		@ApiResponseProperty({ example: "Unauthorized" })
		message: string;

}
