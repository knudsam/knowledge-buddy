import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Replace this URL with your actual GraphQL server URL
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Adjust the URL as needed
  cache: new InMemoryCache(),
});

export default client;
