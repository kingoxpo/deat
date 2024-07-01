import { ApolloClient, InMemoryCache } from '@apollo/client';
import settings from '@/config/settings';

const client = new ApolloClient({
  uri: `${settings.apiUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
