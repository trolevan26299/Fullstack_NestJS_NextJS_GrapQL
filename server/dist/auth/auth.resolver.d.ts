import { AuthService } from './auth.service';
import { User } from 'src/user/models/user.model';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginResponse } from './models/auth.model';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: RegisterDto): Promise<User>;
    login(userData: LoginDto): Promise<LoginResponse>;
}
