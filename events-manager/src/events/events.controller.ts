import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { FindEventDto } from './dto/find-event.dto';
import { UnauthorizedDto } from 'src/auth/dtos/unauthorized.dto';
import { CreateEventResponseDto } from './dto/create-event-response.dto';

@Controller('events')
@ApiTags('Eventos')
@UseGuards(AuthGuard('jwt'))
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
	@ApiOperation({ summary: 'Criar um novo evento.' })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: CreateEventResponseDto
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
	@ApiOperation({ summary: 'Listar todos os eventos cadastrados.' })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: FindEventDto,
		isArray: true
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
	@ApiOperation({ summary: 'Exibir um evento específico pelo ID.' })
	@ApiQuery({ name: "id", example: "213c75d9-9c44-47ad-b195-936b93ec8f6e" })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: CreateEventResponseDto
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
	@ApiOperation({ summary: 'Atualizar um evento específico pelo ID.' })
	@ApiQuery({ name: "id", example: "213c75d9-9c44-47ad-b195-936b93ec8f6e" })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: CreateEventResponseDto
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
	@ApiOperation({ summary: 'Deletar um evento específico pelo ID.' })
	@ApiQuery({ name: "id", example: "213c75d9-9c44-47ad-b195-936b93ec8f6e" })
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
    return this.eventsService.remove(id);
  }
}
