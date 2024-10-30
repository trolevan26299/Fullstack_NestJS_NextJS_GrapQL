import { gql } from "@apollo/client";

export const REGISTER = gql`
mutation Register($userData: RegisterDto!) {
  register(userData: $userData){
    id
    email
    username
    phone
  }
}`;