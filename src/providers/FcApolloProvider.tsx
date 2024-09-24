'use client';
import { ReactNode } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://cms.trial-task.k8s.ext.fcse.io/graphql',
    cache: new InMemoryCache(),
});

function FcApolloProvider({ children }: { children: ReactNode }) {

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}

export { client as apolloClient };
export default FcApolloProvider;
