import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoadingBar from 'react-redux-loading';
import './App.css';

import Navbar from './components/Navbar'
import ListPosts from './components/ListPosts'
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import DetailPost from './components/DetailPost';

class App extends Component {

  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Container>
            <Navbar />
            <Route exact path='/'  component={ListPosts} />
            <Route exact path='/new-post' component={NewPost} />
            <Route exact path='/post/:id/edit' component={EditPost} />
            <Route exact path='/:category/:postId' component={DetailPost} />
          </Container>
        </Fragment>
      </Router>

    );
  }
}

export default App;
