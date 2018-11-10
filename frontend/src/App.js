import React, { Component } from 'react';

import './App.css';

import * as Api from './util/api';


class App extends Component {

  componentWillMount() {
    console.log('CATEGORIES: ',Api.getCategories().then(categories => {
      
        console.log(categories);
      
    }));
    console.log('posts: ',Api.getPosts().then(posts => {
      console.log(posts);
    }));
    
  }


  render() {
    
    return (
      <div className="App">
        <h1>Leitura</h1>
        
      </div>
    );
  }
}

export default App;
