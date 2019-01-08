import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editPostAction } from '../actions/postActions';

import PostForm from './PostForm';

class EditPost extends Component {

    render() {
        let post_id = this.props.match.params.id;

        return (
            <div>
                <br/>
                <h3>Edit Post</h3>
                <PostForm
                    post={this.props.post}
                    onSubmitPost={post => {
                        this.props.editPostAction(post_id, post);
                        this.props.history.push('/')
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({ post: state.posts.post, categories: state.posts.categories })

const mapDispatchToProps = dispatch => bindActionCreators({
    editPostAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);