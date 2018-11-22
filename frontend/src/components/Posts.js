import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    listCategoriesAction,
    postsAction,
    postsByCategoriaAction,
    deletePostAction,
    votePostAction,
    sortPostAction
} from '../actions/postActions';

import { Comment, Icon, Divider, Label } from 'semantic-ui-react';
import moment from 'moment';

class Posts extends Component {

    handleClickVote = (post_id, option) => {
        this.props.votePostAction(post_id, option);
    }

    componentWillMount() {
        this.props.postsAction()
    }

    render() {
        const posts = this.props.posts.posts || [];

        const ListPosts = posts.map((post) =>

            <Comment key={post.id}>

                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>
                    <Link to={`/${post.category}/${post.id}`} >
                        <Comment.Text>{post.title}</Comment.Text>
                        <Comment.Author ><span> {post.author} </span>  </Comment.Author>
                        <Comment.Metadata>
                            <div><strong> posted on his page </strong> {moment(post.timestamp).format("DD/MM/YY HH:mm")}</div>
                        </Comment.Metadata>
                        <Comment.Text>{post.body}</Comment.Text>
                        <Comment.Metadata>
                            <div className="content-like">
                                <Label color={post.voteScore > 0 ? 'green' : 'red'}>
                                    <span>{post.voteScore} Likes </span>
                                </Label>
                            </div>

                            <div className="total-comment">
                                <Label>
                                    {post.commentCount}
                                    <Label.Detail>comments</Label.Detail>
                                </Label>
                            </div>

                        </Comment.Metadata>
                    </Link>


                    <Comment.Actions>
                        <Comment.Action onClick={() => this.handleClickVote(post.id, 'upVote')}>
                            <Icon name="thumbs up outline" color='green' size='large' />
                        </Comment.Action>
                        <Comment.Action onClick={() => this.handleClickVote(post.id, 'downVote')}>
                            <Icon name="thumbs down outline" color='red' size='large' />
                        </Comment.Action>
                    </Comment.Actions>

                </Comment.Content>
                <Divider />
            </Comment>

        )


        return (
            <Comment.Group size='large' >
                {ListPosts}
            </Comment.Group>
        )
    }
}
const mapStateToProps = state => ({ posts: state.posts })
//const mapStateToProps = ({ posts }) => ({ posts })
const mapDispatchToProps = dispatch => bindActionCreators({
    listCategoriesAction,
    postsAction,
    postsByCategoriaAction,
    deletePostAction,
    votePostAction,
    sortPostAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Posts);