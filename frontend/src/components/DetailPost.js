import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    postsAction,
    postsByCategoriaAction,
    deletePostAction,
    votePostAction,
    postById
} from '../actions/postActions';

import { Comment } from 'semantic-ui-react';

import Post from './Post';
import Commentary from './Commentary';

class DetailPost extends Component {
    render() {
        let post = this.props.posts.post
        return (
            <div>
                <br/>
                <Comment.Group size='large' >
                    <Post {...post} />
                </Comment.Group>
                <Commentary />
            </div>
        )
    }
}
const mapStateToProps = state => ({ posts: state.posts })
const mapDispatchToProps = dispatch => bindActionCreators({
    postsAction,
    postsByCategoriaAction,
    deletePostAction,
    votePostAction,
    postById,

}, dispatch)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPost));