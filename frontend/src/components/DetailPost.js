import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Comment } from 'semantic-ui-react';

import Post from './Post';
import Commentary from './Commentary';

class DetailPost extends Component {
    render() {
        let post = this.props.posts.post;
        return (
            <div>
                <br />
                <Comment.Group size='large' >
                    <Post {...post} />
                </Comment.Group>
                <Commentary />
            </div>
        )
    }
}
const mapStateToProps = state => ({ posts: state.posts })

export default connect(mapStateToProps)(DetailPost);