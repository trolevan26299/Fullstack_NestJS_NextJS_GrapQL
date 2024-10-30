import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class LoginResponse {
    @Field({nullable: true})
    accessToken?: string;

    @Field({nullable: true})
    refreshToken?: string;
}