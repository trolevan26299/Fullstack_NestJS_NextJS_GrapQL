import { UserService } from './user.service';
import { User, UserPaginationResponse } from './models/user.model';
import { CreateUserDto, UpdateUserDto, UserFilter } from './dto/user.dto';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    users(filter: UserFilter): Promise<UserPaginationResponse>;
    user(id: number): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(id: number, dataUpdate: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
}
