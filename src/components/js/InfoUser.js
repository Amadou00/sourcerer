import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client"

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers:{
        Authorization:"Bearer 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"
    }
})

const GetLogin = gql`
  query GetUser {
    viewer { 
        login
    }
  }
`

client
  .query({
    query: gql`
    query { 
        viewer { 
          login
        }
      }
    `
  })
  .then(result => console.log(result));
  

function User() {
    const { loading, error, data } = useQuery(GetLogin);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

        console.log(data.viewer.login)
    return (
        <p>{data.viewer.login}</p>
    )
}

function InfoUser() {
    return (
        <ApolloProvider client={client}>
            <User/>
        </ApolloProvider>
    );
}

  
  export default InfoUser;