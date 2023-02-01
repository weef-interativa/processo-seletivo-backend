import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwaggerConflict {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    example:
      'There is already an event scheduled at this location on this date.',
  })
  message: string;
}

export class BadRequestSwaggerUnauthorized {
  @ApiProperty({
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Unauthorized.',
  })
  message: string;
}

export class BadRequestSwaggerForbiddenAccess {
  @ApiProperty({
    example: 403,
  })
  statusCode: number;

  @ApiProperty({
    example: 'This user is not allowed.',
  })
  message: string;
}

export class BadRequestSwaggerNotFound {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'This event does not exist.',
  })
  message: string;
}
