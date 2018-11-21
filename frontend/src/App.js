import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoadingBar from 'react-redux-loading';
import './App.css';

import Navbar from './components/Navbar'
import Posts from './components/Posts'
import NewPost from './components/NewPost';

class App extends Component {

  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Container>
            <Navbar />
            <Route path='/' exact component={Posts} />
            <Route path='/new-post' component={NewPost} />
          </Container>
        </Fragment>
      </Router>

    );
  }
}

export default App;
