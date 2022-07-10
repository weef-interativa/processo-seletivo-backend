import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { FindUserDto } from './dto/find-user.dto';
import { UnauthorizedDto } from 'src/auth/dtos/unauthorized.dto';

@Controller('users')
@ApiTags('Usuários')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
	@ApiOperation({ summary: 'Criar um novo usuário.' })
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: FindUserDto
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

	@UseGuards(AuthGuard('jwt'))
  @Get()
	@ApiOperation({ summary: 'Listar todos os usuários cadastrados.' })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: FindUserDto,
		isArray: true
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  findAll() {
    return this.usersService.findAll();
  }

	@UseGuards(AuthGuard('jwt'))
  @Get(':id')
	@ApiOperation({ summary: 'Exibir um usuário específico pelo ID.' })
	@ApiQuery({ name: "id", example: "707ddf2b-2365-4197-9e62-79d7a02575c1" })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: FindUserDto
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

	@UseGuards(AuthGuard('jwt'))
  @Patch(':id')
	@ApiOperation({ summary: 'Atualizar um usuário específico pelo ID.' })
	@ApiQuery({ name: "id", example: "707ddf2b-2365-4197-9e62-79d7a02575c1" })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: FindUserDto
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

	@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
	@ApiOperation({ summary: 'Deletar um usuário específico pelo ID.' })
	@ApiQuery({ name: "id", example: "707ddf2b-2365-4197-9e62-79d7a02575c1" })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso."
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
