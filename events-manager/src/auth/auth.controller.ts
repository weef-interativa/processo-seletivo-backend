import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { UnauthorizedDto } from './dtos/unauthorized.dto';
import { UserAuthenticatedDto } from './dtos/user-authenticated.dto';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	@ApiOperation({ summary: 'Autenticação de usuário.' })
	@ApiBody({ type: AuthenticateDto })
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso.",
		type: UserAuthenticatedDto
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
	async login(@Req() req: any) {
		return this.authService.login(req.user)
	}
}
