export declare class CreateUserDto {
    email: string;
    password: string;
    username?: string;
    phone?: string;
}
export declare class UserFilter {
    search?: string;
    itemsPerPage?: number;
    page?: number;
}
export declare class UpdateUserDto {
    username?: string;
    phone?: string;
}
