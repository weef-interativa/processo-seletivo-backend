import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public city: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public state: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public address: string;
  
    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false
    })
    public address_complement: string;
  
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty()
    public date: string;
  
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    public email: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public phone_number: string;     
}
