import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getStorageItem } from './persistency';

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});
const authLink = setContext(async (_, { headers }) => {
  const token = await getStorageItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            keyArgs: false,

            merge(existing, incoming) {
              if (!incoming) return existing;
              if (!existing) return incoming;
              const { nodes, ...rest } = incoming;
              const result = rest;
              if (!existing.nodes.includes(nodes[0])) {
                result.nodes = [...existing.nodes, ...nodes];
              } else {
                result.nodes = existing.nodes;
              }
              return result;
            },
          },
        },
      },
    },
  }),
});
