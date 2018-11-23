import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postById, editPostAction } from '../actions/postActions';
import PostForm from './PostForm';

class EditPost extends Component {

    render() {
        let post_id = this.props.match.params.id;
        console.log(post_id)
        console.log(this.props.post)

        return (
            <div>
                <PostForm 
                    post={this.props.post}
                    onSubmitPost={ post => {
                        this.props.editPostAction(post_id, post);
                        this.props.history.push('/')
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({ post: state.posts.post  })

const mapDispatchToProps = dispatch => bindActionCreators({
    postById,
    editPostAction
},dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(EditPost);