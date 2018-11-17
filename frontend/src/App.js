import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoadingBar from 'react-redux-loading';
import './App.css';

import Posts from './components/Posts'


class App extends Component {

  render() {
    
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <Container>

            <Route path='/' component={Posts}/>

          </Container>
        </Fragment>
      </Router>
      
    );
  }
}

export default App;
