import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';


const PageNotFound = () => {
    return (
        <Header textAlign='center'>
            <h1> Page not found. </h1>
            <Link to="/">Back to posts</Link> 
        </Header>
    )
}

export default PageNotFound
