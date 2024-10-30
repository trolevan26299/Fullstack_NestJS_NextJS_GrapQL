import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import {hash,compare} from 'bcrypt';
import { LoginResponse } from './models/auth.model';


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService , private readonly jwtService: JwtService) {}

    async register(userData: RegisterDto): Promise<User> {
        const userExists = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        if(userExists){
            throw new HttpException('this email already exists', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await hash(userData.password, 10);
        const user = await this.prisma.user.create({
            data: { ...userData, password: hashedPassword },
        });
        return user;
    }

    async login(userData: LoginDto): Promise<LoginResponse> {
        const user = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });
        if(!user){
            throw new HttpException({message: 'Invalid credentials'}, HttpStatus.BAD_REQUEST);
        }

        const isPasswordValid = await compare(userData.password, user.password);
        if(!isPasswordValid){
            throw new HttpException({message: 'password is incorrect'}, HttpStatus.BAD_REQUEST);
        }

        const payload = {
           id: user.id,
           name: user.username,
           email: user.email,
        };
        const accessToken = await this.jwtService.signAsync(payload,{
            secret: process.env.JWT_SECRET,
            expiresIn: 60,
        });
        const refreshToken = await this.jwtService.signAsync(payload,{
            secret: process.env.JWT_SECRET,
            expiresIn: '7d',
        });
        return {accessToken, refreshToken};
    }
}
