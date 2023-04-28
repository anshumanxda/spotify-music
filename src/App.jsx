import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import Home from './pages/Home'

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: 'https://api.ss.dev/resource/api'
  })
])

const client = new ApolloClient({
  cache: new InMemoryCache,
  link
})

function App () {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )
}

export default App
