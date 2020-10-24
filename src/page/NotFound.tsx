import React from 'react';
import {Button, Container} from 'trunx'
import '../App.css';
import 'bulma/css/bulma.css'

interface ITestProps {
}

interface ITestState {
}

export default class NotFounds extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    render() {

        return (
            <Container isWidescreen>
                <h1 > Page not found</h1>
            </Container>
        );
    }
}