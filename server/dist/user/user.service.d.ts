import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto, UserFilter } from './dto/user.dto';
import { UserPaginationResponse } from './models/user.model';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dataUser: any): Promise<User>;
    findAll(filter: UserFilter): Promise<UserPaginationResponse>;
    findOne(id: number): Promise<User | null>;
    update(id: number, dataUpdate: UpdateUserDto): Promise<User>;
    delete(id: number): Promise<boolean>;
}
