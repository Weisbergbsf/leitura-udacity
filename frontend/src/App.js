import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoadingBar from 'react-redux-loading';
import './App.css';

import Navbar from './components/Navbar'
import Posts from './components/Posts'
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';

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
            <Route path='/post/:id' component={EditPost} />
          </Container>
        </Fragment>
      </Router>

    );
  }
}

export default App;
