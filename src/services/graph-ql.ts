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
  query {
    users {
      nodes {
        name
        email
        id
      }
    }
  }
`;
