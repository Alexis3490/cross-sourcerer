import { gql } from "apollo-boost";

export const GET_POSTS= gql`
    query {
        viewer{
            login
            name
            avatarUrl
            bio
            followers (first: 100){
                totalCount
            }
            following (first: 100) {
                totalCount
            }
            repositories (first: 100) {
                totalCount
                nodes{
                    id
                    name
                    description
                    url
                    collaborators{
                        totalCount
                    }
                    languages (first: 100) {
                        nodes{
                            name
                            color
                        }
                    }
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

