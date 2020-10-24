import { gql } from "apollo-boost";

export const GET_POSTS= gql`
    query {
        viewer{
            login
            name
            followers (first: 100){
                totalCount
            }
            following (first: 100) {
                totalCount
            }
            repositories (first: 100) {
                totalCount
                nodes{
                    name
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

