export interface Github {
    viewer:{
        followers: [
            _typename: string,
            totalCount: number
        ];
        following: [
            _typename: string,
            totalCount: number
        ];
        login: string;
        name: string;
        repositories: [
            _typename: string,
            totalCount: number,
            nodes:[
                _typename: string,
                name: string,
                defaultBranchRef:{
                    target: {
                        _typename: string,
                        history:
                            {
                                _typename: string,
                                totalCount:number
                            }
                    }

                 }
            ]

        ];
        _typename: string;

    }
}

export interface GithubData {
    Github: {Github: any},
}

export interface GithubVariable {
}