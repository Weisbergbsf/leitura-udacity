import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postsAction } from '../actions/postActions';

import { Comment } from 'semantic-ui-react';

import Post from './Post';

class Posts extends Component {

    componentWillMount() {
        this.props.postsAction();
    }

    
    render() {
        const posts = this.props.posts.posts || [];
        return (
            <Comment.Group size='large' >
                {posts.map(post => {
                    return (
                    <Comment key={post.id}>
                        <Post {...post} />
                    </Comment>)
                })}
            </Comment.Group>
        )
    }
}
const mapStateToProps = state => ({ posts: state.posts, categories: state.posts.categories })
const mapDispatchToProps = dispatch => bindActionCreators({
    postsAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Posts);