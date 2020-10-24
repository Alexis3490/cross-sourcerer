import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import {Container} from 'trunx'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import StatsGithub from "./page/StatsGithub";
import NotFound from "./page/NotFound"


interface ITestProps {
}

interface ITestState {
}

export default class App extends React.Component<ITestProps, ITestState> {
  constructor(props: ITestProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {

    return (
        <Container isWidescreen>
          <Router>
            <Switch>
              <Route exact path='/' component={StatsGithub}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          </Router>
        </Container>
    );
  }
}
