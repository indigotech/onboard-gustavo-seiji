import { gql } from '@apollo/client';

export const loginMutationGQL = gql`
  mutation LoginMutation($loginData: LoginInputType!) {
    login(data: $loginData) {
      token
      user {
        id
        name
        phone
        birthDate
        email
        role
      }
    }
  }
`;

export const usersQueryGQL = gql`
  query getUsers($pageInfo: PageInputType) {
    users(pageInfo: $pageInfo) {
      pageInfo {
        hasNextPage
        offset
      }
      nodes {
        name
        email
        id
      }
    }
  }
`;

export const userDetailsQueryGQL = gql`
  query getUsers($id: ID!) {
    user(id: $id) {
      name
      phone
      birthDate
      email
      role
    }
  }
`;
export const createUserMutationGQL = gql`
  mutation create($data: UserInputType!) {
    createUser(data: $data) {
      id
    }
  }
`;
