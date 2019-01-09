import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postById } from '../actions/postActions';

import { Comment, Header } from 'semantic-ui-react';
import Post from './Post';
import Commentary from './Commentary';

class DetailPost extends Component {

    componentWillMount() {
        this.props.postById(this.props.match.params.postId)
    }

    render() {
        let post = this.props.posts.post;
        return (
            <div>
                {post.id !== undefined ? (
                    <div>
                        <br />
                        <Comment.Group size='large' >
                            <Post {...post} />
                        </Comment.Group>
                        <Commentary />
                    </div>
                ) : (
                        <Header textAlign='center'>
                            <br />
                            <h1> Post not found! </h1>
                        </Header>
                    )}

            </div>
        )
    }
}
const mapStateToProps = state => ({ posts: state.posts })
const mapDispatchToProps = dispatch => bindActionCreators({
    postById
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);