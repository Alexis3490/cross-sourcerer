import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GITHUB_API_URI,
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization:  `Bearer ${process.env.REACT_APP_TOKEN}`,
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});