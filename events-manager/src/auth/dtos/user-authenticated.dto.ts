import { ApiResponseProperty } from "@nestjs/swagger";

export class UserAuthenticatedDto {
	@ApiResponseProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MDdkZGYyYi0yMzY1LTQxOTctOWU2Mi03OWQ3YTAyNTc1YzEiLCJlbWFpbCI6Imd1aS5zYXJ0b3JpOTZAZ21haWwuY29tIiwiaWF0IjoxNjU3NDgxMTcyLCJleHAiOjE2NTc0ODgzNzJ9.gAeu7TGVaeJD7uaAVo_9ZFpCh-UHeJZe9Kn7JBXsfWA"})
	token: string
}
