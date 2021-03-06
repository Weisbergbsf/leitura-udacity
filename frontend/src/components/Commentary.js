import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    commentById,
    listCommentsByPostAction,
    showFormAddComment,
    showFormEditComment,
    deleteCommentAction,
    voteCommentAction
} from '../actions/commentActions';

import { Comment, Icon, Label, Button, Form, Segment, Divider } from 'semantic-ui-react';
import moment from 'moment';

import swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

import NewComment from './NewComment';
import EditComment from './EditComment';

class Commentary extends Component {

    componentWillMount() {
        this.props.listCommentsByPostAction(this.props.match.params.postId)
    }

    handleAddComment = () => {
        if (this.props.formAdd === false) {
            this.props.showFormAddComment(true)
        } else if (this.props.formAdd === true) {
            this.props.showFormAddComment(false)
        }
        this.props.showFormEditComment(false)
    }

    handleComment = (comment_id) => {
        this.props.showFormAddComment(false)
        this.props.commentById(comment_id);
    }

    handleDeleteComment = (comment_id) => {

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this comment!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    `Comment deleted`,
                    'success'
                )
                this.props.deleteCommentAction(comment_id);
            }
        })
    }

    render() {
        let comments = this.props.comments || [];

        return (
            <div>
                <Segment>
                    <Comment.Group size='large' >

                        <div>
                            <Form >
                                <h1 >{comments.length > 0 ? 'Comments' : 'No Comments'}</h1>
                                <Button
                                    circular content='Add Comment' icon='reply' color='blue'
                                    onClick={this.handleAddComment}
                                />
                            </Form>

                            <Comment.Group>
                                {this.props.formAdd && (
                                    <NewComment />
                                )}
                            </Comment.Group>

                            <Comment.Group >
                                {this.props.formEdit && (
                                    <EditComment />
                                )}
                            </Comment.Group>
                        </div>

                        {comments.map(comment => {
                            return (
                                <Comment key={comment.id}>
                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                    <Comment.Content>
                                        <Comment.Author ><span> {comment.author} </span>  </Comment.Author>
                                        <Comment.Metadata>
                                            <div><strong> posted on his page </strong> {moment(comment.timestamp).format("DD/MM/YY HH:mm")}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{comment.body}</Comment.Text>
                                        <Comment.Metadata>
                                            <div className="content-like">
                                                <Label color={comment.voteScore > 0 ? 'green' : 'red'}>
                                                    <span>{comment.voteScore} Likes </span>
                                                </Label>
                                            </div>
                                        </Comment.Metadata>
                                        <div>
                                            <Comment.Actions>
                                                <Comment.Action >
                                                    <Icon name="thumbs up outline" color='green' size='large' onClick={() => this.props.voteCommentAction(comment.id, 'upVote')} />
                                                </Comment.Action>
                                                <Comment.Action >
                                                    <Icon name="thumbs down outline" color='red' size='large' onClick={() => this.props.voteCommentAction(comment.id, 'downVote')} />
                                                </Comment.Action>

                                                <Comment.Action onClick={() => this.handleDeleteComment(comment)}>
                                                    <Icon name="trash alternate outline" color='red' size='large' />
                                                </Comment.Action>
                                                <Comment.Action >
                                                    <Icon name="edit outline" color='blue' size='large'
                                                        onClick={() => this.handleComment(comment.id)}
                                                    />
                                                </Comment.Action>

                                            </Comment.Actions>
                                        </div>
                                    </Comment.Content>
                                    <Divider />
                                </Comment>
                            )
                        })}
                    </Comment.Group>
                </Segment>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    comments: state.comments.comments,
    formEdit: state.comments.formEdit,
    formAdd: state.comments.formAdd

})
const mapDispatchToProps = dispatch => bindActionCreators({
    listCommentsByPostAction,
    commentById,
    showFormAddComment,
    showFormEditComment,
    deleteCommentAction,
    voteCommentAction
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Commentary));