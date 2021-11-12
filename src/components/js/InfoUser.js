import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client"
import "../css/style.css"

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers:{
        Authorization:"Bearer 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"
    }
})

const GetUser = gql`
    query GetUser { 
        viewer {
            login
            avatarUrl
            name
            bio
            repositories {
                totalCount
            }
            followers {
                totalCount
            }
            following {
                totalCount
            }
            repositories(first: 10) {
                totalCount
                nodes {
                    url
                    languages(first: 10) {
                        totalCount
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }
`
  

function User() {
    const { loading, error, data } = useQuery(GetUser);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    console.log(data)

    return (
        <div>
            <div className="w3-container">
                <p className="w3-left-align title w3-third">{data.viewer.name}</p>
                <p className="w3-center desc w3-third">{data.viewer.bio}</p> 
                <p className="w3-third title">1</p>           
            </div>

            <div>

                <div>
                    <p className="w3-left-align pseudo">{data.viewer.login}</p>
                    <img className="w3-circle w3-col l2" src={data.viewer.avatarUrl}/>
                </div>

                <div className="w3-container w3-gray w3-col l2 Info">
                    <p>Repos</p>
                    <p>{data.viewer.repositories.totalCount}</p>
                </div>

                <div className="w3-container w3-gray w3-col l2 Info">
                    <p>Followers</p>
                    <p>{data.viewer.repositories.followers || 0}</p>
                </div>

                <div className="w3-container w3-gray w3-col l2 Info">
                    <p>Followings</p>
                    <p>{data.viewer.repositories.followings || 0}</p>
                </div>

            </div>

            <div>
                <p>languages</p>
            </div>
        </div>
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