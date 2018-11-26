import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postsAction, postsByCategoriaAction, listCommentsByPostAction } from '../actions/postActions';
import { commentById } from '../actions/commentActions';

import { Comment, Icon, Label, Button, Form } from 'semantic-ui-react';
import moment from 'moment';

import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

import CommentForm from './CommentForm'
import NewComment from './NewComment'
import EditComment from './EditComment'


class Commentary extends Component {

    state = { 
        collapsedNewComment: true,
        collapsedEditComment: false
    }

    handleAddComment = (e) => this.setState({ collapsedNewComment: !this.state.collapsedNewComment })

    componentWillMount() {
        this.props.listCommentsByPostAction(this.props.match.params.postId)
    }

    handleComment = (comment_id) => {
        console.log('handleComment: ', comment_id)
        this.props.commentById(comment_id);
        //this.props.postById(post_id)
        //this.props.history.push(`/post/${post_id}/edit`)
        
    }

    handleDeletePost = (post_id, title) => {
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this post!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    `Post "${title}" deleted`,
                    'success'
                )
                this.props.deletePostAction(post_id)
            }
        })
    }

    render() {
        let comments = this.props.comments || [];
        const { collapsedNewComment } = this.state;
        console.log(comments)
        return (
            <div>
                <Comment.Group size='large' >

                    <div>
                        <Form >
                            <h1 >{comments.length > 0 ? 'Comments' : 'No Comments'}</h1>
                            <Button
                                circular content='Add Comment' icon='reply' color='blue'
                                onClick={this.handleAddComment}
                            />
                        </Form>

                        <Comment.Group collapsed={collapsedNewComment}>
                            <NewComment />
                        </Comment.Group>

                        <Comment.Group collapsed={collapsedNewComment}>
                            {/*TODO: EditComment*/}
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
                                                <Icon name="thumbs up outline" color='green' size='large' />
                                            </Comment.Action>
                                            <Comment.Action >
                                                <Icon name="thumbs down outline" color='red' size='large' />
                                            </Comment.Action>

                                            <Comment.Action >
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
                            </Comment>
                        )
                    })}
                </Comment.Group>
            </div>
        )
    }
}
const mapStateToProps = state => ({ 
    posts: state.posts, 
    comments: state.posts.comments,
    comment: state.comments.comment

})
const mapDispatchToProps = dispatch => bindActionCreators({
    postsAction,
    postsByCategoriaAction,
    listCommentsByPostAction,
    commentById
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Commentary));