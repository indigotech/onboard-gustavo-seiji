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
      }
      nodes {
        name
        email
        id
      }
    }
  }
`;
