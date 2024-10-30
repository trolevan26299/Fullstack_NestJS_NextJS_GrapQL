import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
mutation UpdateUser($id: Float!, $dataUpdate: UpdateUserDto!) {
    update(id: $id, dataUpdate: $dataUpdate){
        id
        username
        phone
    }
}`;