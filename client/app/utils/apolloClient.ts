import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getSession } from "next-auth/react";


const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql"
})
const authLink = setContext(async (_, { headers }) => {
    const session = await getSession();
    const token = session?.user.accessToken;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client;