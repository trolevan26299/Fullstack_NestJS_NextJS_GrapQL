export declare class User {
    id: number;
    email: string;
    password: string;
    username?: string;
    phone?: string;
}
export declare class UserPaginationResponse {
    data: User[];
    total: number;
    currentPage: number;
    itemsPerPage: number;
}
