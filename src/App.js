import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layouts/Header';
import Landing from './layouts/Landing';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Landing} />
                </Switch>
            </div>
        </Router>
    )
  }
}

export default App;
