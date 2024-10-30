import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($userData: CreateUserDto!) {
  createUser(userData: $userData){
    id
    email
    username
    phone
  }
}`;