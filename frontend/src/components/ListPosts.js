import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postsAction, postsByCategoriaAction } from '../actions/postActions';

import { Comment } from 'semantic-ui-react';
import Post from './Post';

class Posts extends Component {

    componentWillMount() {
        if (this.props.match.params.category !== undefined) {
            this.props.postsByCategoriaAction(this.props.match.params.category)
        } else {
            this.props.postsAction();
        }
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
    postsAction, 
    postsByCategoriaAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Posts);