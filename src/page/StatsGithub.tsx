import React, {useState} from 'react';
import {Container, Column, Columns, Button } from "trunx";
import { useQuery } from '@apollo/client';
import {GithubData, GithubVariable} from "../queries/interface";
import {GET_POSTS} from "../queries/profile";
import {VictoryPie}  from 'victory';
import '../css/github.css'

export default function StatsGithub() {
    const [githubdata, setgithubdata] = useState(Object);
    const [follower, setfollower]= useState(Object)
    const [following, setfollowing]= useState(Object)
    const [repositories, setrepositories]= useState(Object)
    const [repositoriesInfo, setrepositoriesInfo]= useState([])
    const [status_githubdata, setStatus_githubdata] = useState(false);
    let tb_count_commit=[]
    let number_counts_total=0
    let language_commit=[];
    let list_language=[];
    let nb_language_commit: { language?: any; nb?: number; commit?: number; languages?: { nodes: { name: string; }; }; id?: number; }[]=[]
    let nb_language=0
    let commit_total_by_language=0
    let graph=[]
    let color_grah=[]
    const d = new Date();
    let mouth=0;
    if (d.getMonth()+1 < 10)
    {
        mouth=0+d.getMonth()
    }
    else

    {
        mouth=d.getMonth()
    }
    let date=0;
    if (d.getDate()< 10)
    {
        date=0+d.getDate()
    }
    else

    {
        date=d.getDate()
    }
    let date_time=d.getFullYear()+'/'+mouth+'/'+date+ ' - ' +d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()


    let { loading, data } = useQuery<GithubData, GithubVariable>(
        GET_POSTS,
        { variables: { } }
    );
   if(!loading) {
       if (!status_githubdata) {
           setStatus_githubdata(true)
           let json = JSON.parse(JSON.stringify(data))
           setgithubdata(json.viewer)
           setfollower(json.viewer.followers)
           setfollowing(json.viewer.following)
           setrepositories(json.viewer.repositories)
           setrepositoriesInfo(json.viewer.repositories.nodes)
       }

       // calcul number commit
       for (let i = 0; i < repositoriesInfo.length; i++) {
           let datajson = JSON.parse(JSON.stringify(Object(repositoriesInfo[i])))
           tb_count_commit.push(datajson.defaultBranchRef.target.history.totalCount);
       }
       for (let i = 0; i < tb_count_commit.length; i++) {
           number_counts_total = tb_count_commit[i] + number_counts_total
       }

       //calcul list language + nb commit
       for (let i = 0; i < repositoriesInfo.length; i++) {
           let datajson = JSON.parse(JSON.stringify(Object(repositoriesInfo[i])))

           for (let i = 0; i < datajson.languages.nodes.length; i++) {
               let language = datajson.languages.nodes[i].name
               let color = datajson.languages.nodes[i].color
               let nb_commit = datajson.defaultBranchRef.target.history.totalCount
               language_commit.push({
                   language: language,
                   commit: nb_commit,
                   color: color
               })
           }
       }

       //calcul list language global
       for (let i = 0; i < language_commit.length; i++) {
           let jsons = JSON.parse(JSON.stringify(Object(language_commit[i])))
           if (list_language.indexOf(jsons.language) === -1) {
               list_language.push(jsons.language)
           }
       }

       //list  and number use language with number commit
       for (let k = 0; k < list_language.length; k++) {
           nb_language = 0;
           for (let i = 0; i < language_commit.length; i++) {
               let jsons = JSON.parse(JSON.stringify(Object(language_commit[i])))
               if (jsons.language.indexOf(list_language[k]) !== -1) {
                   nb_language++;
                   commit_total_by_language = jsons.commit + commit_total_by_language
               }
           if(color_grah.indexOf(language_commit[i].color) === -1)
           {
               color_grah.push(language_commit[i].color)
           }
           }
           nb_language_commit.push({
               language: list_language[k],
               nb: nb_language,
               commit: commit_total_by_language
           })
           graph.push({
               x: list_language[k],
               y: nb_language
           })


       }
   }

    return (
        <Container isWidescreen>
            {loading ? (
                <p>Loading ...</p>
            ) : (
                <Columns>
                    <Column>
                        <Columns>
                            <Column>
                                <h1 style={{fontSize: 50}}> {githubdata.name}</h1>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginTop:20, marginLeft:50}}>{githubdata.bio}</p>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginLeft:300, marginTop: 20}}>1</p>
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>
                               <p> {githubdata.login}</p>
                                <img style={{borderRadius: "50%"}} src={githubdata.avatarUrl}/>
                            </Column>
                            <Column>
                                <div className="container"></div>
                                <div className="border">
                                    <p className="text_profile_1">
                                        Commits
                                    </p>
                                    <p className="text_profile_2">
                                        {number_counts_total}
                                    </p>
                                </div>
                            </Column>
                            <Column>
                                <div className="container"></div>
                                <div className="border">
                                    <p className="text_profile_1">
                                    Repos
                                </p>
                                    <p className="text_profile_2">
                                    {repositories.totalCount}
                                </p>
                                </div>
                            </Column>
                            <Column>
                                <div className="container"></div>
                                <div className="border">
                                    <p className="text_profile_1">
                                    Lines of code
                                </p>
                                </div>
                            </Column>
                            <Column>
                                <div className="container"></div>
                                <div className="border_2">
                                    <p className="text_profile_1">
                                    Followers
                                </p>
                                    <p className="text_profile_2">
                                    {follower.totalCount}
                                </p>
                                </div>
                            </Column>
                            <Column>
                                <div className="container"></div>
                                <div className="border_2">
                                    <p className="text_profile_1">
                                    Followings
                                </p>
                                    <p className="text_profile_2">
                                    {following.totalCount}
                                </p>
                                </div>
                            </Column>
                            <Column>
                                <div className="container"></div>
                                <Button className="border_3" onClick={() => window.location.href='/'}>
                                    Refresh
                                </Button>
                            </Column>
                        </Columns>
                            <Columns>
                                <Column>
                                    <h1 style={{fontSize: 50}}> Overview</h1>
                                </Column>
                                <Column>
                                    <p style={{fontSize:20, marginTop:20, marginLeft:50}}>{repositories.totalCount} repos</p>
                                    <p style={{fontSize:20, marginTop:20, marginLeft:50}}> Last updated {date_time}</p>
                                </Column>
                                <Column>
                                    <p style={{fontSize:20, marginLeft:300, marginTop: 20}}>2</p>
                                </Column>
                        </Columns>
                        <div className="container_global"></div>
                        <Columns>
                            <Column>
                                <h1 style={{fontSize: 50}}> Languages</h1>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginTop:20, marginLeft:50}}>{repositories.totalCount} repos</p>
                                <p style={{fontSize:20, marginTop:20, marginLeft:50}}> Last updated {date_time}</p>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginLeft:300, marginTop: 20}}>3</p>
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>
                                <svg viewBox="0 50 300 150" >
                                    <VictoryPie
                                        colorScale={color_grah}
                                        standalone={false}
                                        width={400} height={250}
                                        data={graph}
                                        style={{
                                            labels: {
                                                 fontSize: 3,
                                                fontWeight: 'bold'
                                            }
                                        }}
                                        innerRadius={0} labelRadius={50}
                                    />
                                </svg>
                            </Column>
                        </Columns>
                        <div className="container_global"></div>
                        <Columns>
                            <Column>
                                <h1 style={{fontSize: 50}}> Technologies</h1>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginTop:20, marginLeft:50}}>{repositories.totalCount} repos</p>
                                <p style={{fontSize:20, marginTop:20, marginLeft:50}}> Last updated {date_time}</p>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginLeft:300, marginTop: 20}}>4</p>
                            </Column>
                        </Columns>
                        <div className="container_global"></div>
                        <Columns>
                            <Column>
                                <h1 style={{fontSize: 50}}> Repositories</h1>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginTop:20, marginLeft:50}}>{repositories.totalCount} repos</p>
                                <p style={{fontSize:20, marginTop:20, marginLeft:50}}> Last updated {date_time}</p>
                            </Column>
                            <Column>
                                <p style={{fontSize:20, marginLeft:300, marginTop: 20}}>6</p>
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>
                                #
                            </Column>
                            <Column>
                                Repository
                            </Column>
                            <Column>
                                Commits
                            </Column>
                            <Column>
                                Team
                            </Column>
                            <Column>
                                Language
                            </Column>
                            <Column>
                                Timeline
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>

                            </Column>
                            <Column>
                            { repositoriesInfo&& repositoriesInfo.map(( repository:{
                                id:number; name: string; description: string; url:string}) => (
                                <div>
                                    <tr key={repository.id}></tr>
                                    <br></br>
                                    <tr>{repository.name}</tr>
                                    {repository.description === null ? <br></br> : <tr>{repository.description}</tr>}
                                    <tr>{`${(repository.url).split('/')[3]}/${(repository.url).split('/')[4]}`}</tr>
                                    <img style={{borderRadius: "50%"}} src={githubdata.avatarUrl} alt="" width="50" height="50"/>
                                </div>

                                ))}
                            </Column>
                            <Column>
                                { repositoriesInfo&& repositoriesInfo.map(( repository:{
                                    defaultBranchRef: { target: { history: { totalCount: number}}};
                                    id:number;}) => (
                                    <div>
                                        <tr key={repository.id}></tr>
                                        <br></br>
                                        <tr>{repository.defaultBranchRef.target.history.totalCount}</tr>
                                        <br></br>
                                        <br></br>
                                    </div>

                                ))}
                            </Column>
                            <Column>
                                { repositoriesInfo&& repositoriesInfo.map(( repository:{
                                    collaborators:{totalCount:number};
                                    id:number;}) => (
                                    <div>
                                        <tr key={repository.id}></tr>
                                        <br></br>
                                        <tr>{repository.collaborators.totalCount}</tr>
                                        <br></br>
                                        <br></br>
                                    </div>
                                ))}
                            </Column>
                            <Column>
                                { repositoriesInfo&& repositoriesInfo.map(( repository:{
                                    languages: { nodes: {name: string} };
                                    id:number;}) => (
                                    <div>
                                        <tr key={repository.id}></tr>
                                        <br></br>
                                        <tr>{repository.languages.nodes.name}</tr>
                                        <br></br>
                                        <br></br>
                                    </div>
                                ))}
                            </Column>
                            <Column >

                            </Column>
                        </Columns>
                    </Column>
                </Columns>
            )}
        </Container>
    );
}