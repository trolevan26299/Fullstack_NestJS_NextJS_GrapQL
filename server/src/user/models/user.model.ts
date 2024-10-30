import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User{
    @Field(() => Int)
    id: number;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String, { nullable: true })
    username?: string;

    @Field(() => String, { nullable: true })
    phone?: string;
}

@ObjectType()
export class UserPaginationResponse {
    @Field(() => [User])
    data: User[]

    @Field()
    total: number

    @Field()
    currentPage: number
    
    @Field()
    itemsPerPage: number
}
