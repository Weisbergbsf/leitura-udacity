import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    postsAction,
    postsByCategoriaAction,
    deletePostAction,
    votePostAction,
    postById,

} from '../actions/postActions';

import { Comment, Icon, Divider, Label } from 'semantic-ui-react';
import moment from 'moment';

import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

class Post extends Component {

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

    handlePost = (post_id) => {
        this.props.postById(post_id)
        this.props.history.push(`/post/${post_id}/edit`)
    }

    handleDetailPost = (category, post_id) => {
        this.props.postById(post_id)
        this.props.history.push(`/${category}/${post_id}`)
    }

    render() {
        const { id, timestamp, title, body, author, voteScore, commentCount, category } = this.props

        return (
            <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>
                    <div onClick={() => this.handleDetailPost(category, id)}>
                        <Comment.Text>{title}</Comment.Text>
                        <Comment.Author ><span> {author} </span>  </Comment.Author>
                        <Comment.Metadata>
                            <div><strong> posted on his page </strong> {moment(timestamp).format("DD/MM/YY HH:mm")}</div>
                        </Comment.Metadata>
                        <Comment.Text>{body}</Comment.Text>
                        <Comment.Metadata>
                            <div className="content-like">
                                <Label color={voteScore > 0 ? 'green' : 'red'}>
                                    <span>{voteScore} Likes </span>
                                </Label>
                            </div>

                            <div className="total-comment">
                                <Label>
                                    {commentCount}
                                    <Label.Detail>comments</Label.Detail>
                                </Label>
                            </div>

                        </Comment.Metadata>
                    </div>
                    <div>
                        <Comment.Actions>
                            <Comment.Action onClick={() => this.props.votePostAction(id, 'upVote')}>
                                <Icon name="thumbs up outline" color='green' size='large' />
                            </Comment.Action>
                            <Comment.Action onClick={() => this.props.votePostAction(id, 'downVote')}>
                                <Icon name="thumbs down outline" color='red' size='large' />
                            </Comment.Action>

                            <Comment.Action onClick={() => this.handleDeletePost(id, title)}>
                                <Icon name="trash alternate outline" color='red' size='large' />
                            </Comment.Action>
                            <Comment.Action onClick={() => this.handlePost(id)}>
                                <Icon name="edit outline" color='blue' size='large' />
                            </Comment.Action>

                        </Comment.Actions>
                    </div>
                </Comment.Content>
                <Divider />

            </Comment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));