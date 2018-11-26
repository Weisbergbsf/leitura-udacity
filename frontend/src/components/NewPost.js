import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listCategoriesAction, createPostAction } from '../actions/postActions';

import PostForm from './PostForm';

class NewPost extends Component {

    render() {
        
        return (
            <div>
                <br/>
                <h3>New Post</h3>
                
                <PostForm 
                    onSubmitPost={(post) => {
                        this.props.createPostAction(post);
                        this.props.history.push('/')
                    }}
                />
                
            </div>
        )
    }
}

const mapStateToProps = state => ({ categories: state.posts.categories, posts: state.posts  })
const mapDispatchToProps = dispatch => bindActionCreators({
    listCategoriesAction,
    createPostAction,
},dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));