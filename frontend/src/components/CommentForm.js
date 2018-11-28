import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listCategoriesAction, createPostAction } from '../actions/postActions';
import { listCommentsByPostAction, commentById } from '../actions/commentActions';

const styleErro = {
    color: 'red',
    fontWeight: 'bold'
}

class CommentForm extends Component {
    
    state = {
        author: '',
        body: '',
        parentId: '',
        id: '',

        error: ''
    }
    
    componentWillReceiveProps(nexProps) {
        let comment = nexProps.comment
        this.setState({
            author: comment ? comment.author : '',
            body: comment ? comment.body : '',
            parentId: nexProps.match.params.postId,
            id: comment ? comment.id : '',
        })
    }

    componentWillMount() {
        this.setState({parentId: this.props.match.params.postId})
    }

    constructor(props) {
        super(props);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onAuthorChange(e) {
        const author = e.target.value;
        this.setState(() => ({ author: author }));
    }

    onBodyChange(e) {
        const body = e.target.value;
        this.setState(() => ({ body: body }));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.author || !this.state.body) {
            this.setState(() => ({ error: 'Please, set author & description!' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmitComment({
                    author: this.state.author,
                    body: this.state.body,
                    parentId: this.state.parentId,
                    id: this.state.id
            });
        }
    }

    render() {

        return (
            <div>
                <br />
                {this.state.error !== '' && (
                    <p style={styleErro}>{this.state.error}</p>
                )}

                <Form onSubmit={this.handleSubmit}>
                    
                    <Form.Field control={Input} label='Author' placeholder='Author'
                        name='author' value={this.state.author} onChange={this.onAuthorChange}
                    />
                    
                    <Form.TextArea label='Body' placeholder="What's happening?"
                        name='body' value={this.state.body} onChange={this.onBodyChange}
                    />

                    <Form.Button
                        disabled={!this.state.author || !this.state.body}
                    >Submit</Form.Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    posts: state.posts,
    comments: state.comments.comments,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    listCategoriesAction,
    createPostAction,
    listCommentsByPostAction,
    commentById
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));