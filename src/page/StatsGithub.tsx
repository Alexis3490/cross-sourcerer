import React, {useState} from 'react';
import {Container, Column, Columns } from "trunx";
import { useQuery } from '@apollo/client';
import {GithubData, GithubVariable} from "../queries/interface";
import {GET_POSTS} from "../queries/profile";

export default function StatsGithub() {
    const [datas, setdata] = useState(Object);
    const [status, setStatus] = useState(false);
    let { loading, data } = useQuery<GithubData, GithubVariable>(
        GET_POSTS,
        { variables: { } }
    );
   if(!loading)
   {
       if(!status)
       {
           setStatus(true)
           let json = JSON.parse(JSON.stringify(data))
           setdata(json.viewer)
       }
   }

    return (
        <Container isWidescreen>
            <h3>Github</h3>
            {loading ? (
                <p>Loading ...</p>
            ) : (
                <Columns>
                    <Column>

                    </Column>
                </Columns>
            )}
        </Container>
    );
}