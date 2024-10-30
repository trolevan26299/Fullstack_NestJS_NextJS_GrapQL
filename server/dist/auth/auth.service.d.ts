import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginResponse } from './models/auth.model';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(userData: RegisterDto): Promise<User>;
    login(userData: LoginDto): Promise<LoginResponse>;
}
