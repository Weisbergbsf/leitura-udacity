import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { editCommentAction, listCommentsByPostAction } from '../actions/commentActions';
import CommentForm from './CommentForm';

class EditComment extends Component {

    render() {

        let category = this.props.match.params.category;
        let postId = this.props.match.params.postId;

        return (
            <div>
                <h3>Edit Comment</h3>
                <CommentForm
                    comment={this.props.comment}
                    onSubmitComment={comment => {
                        this.props.editCommentAction(comment.id, comment);
                        this.props.history.push(`/${category}/${postId}`);
                        this.props.listCommentsByPostAction(postId);
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    comment: state.comments.comment
})

const mapDispatchToProps = dispatch => bindActionCreators({
    editCommentAction,
    listCommentsByPostAction
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditComment));