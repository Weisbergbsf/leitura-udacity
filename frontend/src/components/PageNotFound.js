import React from 'react';
import { Header } from 'semantic-ui-react';

const PageNotFound = ({location}) => {
    return (
        <Header textAlign='center'>
            <h1> Page not found. </h1>
            <a href="/">Back to posts</a> 
        </Header>
    )
}

export default PageNotFound
