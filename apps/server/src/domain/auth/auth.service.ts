import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../api/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../api/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.createUser(registerDto);
        const { password, ...result } = user;
        return {
            user: result,
            access_token: this.jwtService.sign({
                sub: user.id,
                email: user.email,
            }),
        };
    }

    async login(user: User) {
        const payload = { sub: user.id, email: user.email };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async logout(userId: string) {
        // 로그아웃 로직 (예: 토큰 블랙리스트 등)
        return { message: 'Logged out successfully' };
    }

    async refresh(userId: string) {
        const user = await this.userService.findUserById(userId);
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
