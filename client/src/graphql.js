import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Replace this URL with your actual GraphQL server URL
const client = new ApolloClient({
  uri: '/graphql', // Adjust the URL as needed
  cache: new InMemoryCache(),
});

export default client;
