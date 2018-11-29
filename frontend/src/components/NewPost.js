import React, { Component } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPostAction } from '../actions/postActions';

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

const mapDispatchToProps = dispatch => bindActionCreators({
    createPostAction,
},dispatch)

export default connect(null, mapDispatchToProps)(NewPost);