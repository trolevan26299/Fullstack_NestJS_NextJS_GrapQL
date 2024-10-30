import { gql } from "@apollo/client";

export const GET_USER = gql`
query getUser($id: Float!) {
  user(id: $id){
    id
    username
    email
    phone
  }
}`;