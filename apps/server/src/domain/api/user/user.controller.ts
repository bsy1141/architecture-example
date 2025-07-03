import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllUsers() {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        return this.userService.findUserById(req.user.id);
    }
}
