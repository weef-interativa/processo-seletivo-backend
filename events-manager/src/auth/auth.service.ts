import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}

	async login(user: any) {
		const payload = { sub: user.id, email: user.email }

		return {
			token: this.jwtService.sign(payload)
		}
	}

	async validateUser(email: string, password: string) {
		let user: User

		try {
			user = await this.usersService.findOneByEmailOrFail(email)
		} catch (error) {
			return null
		}

		const isPasswordValid = bcryptjs.compareSync(password, user.password)

		if(!isPasswordValid) return null

		return user

	}
}
