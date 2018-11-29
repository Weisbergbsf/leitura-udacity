import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styleErro = {
    color: 'red',
    fontWeight: 'bold'
}

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    state = {
        author: '',
        body: '',
        parentId: '',
        id: '',
        error: ''
    }
    
    componentWillReceiveProps(nexProps) {
        let comment = nexProps.comment;
        this.setState({
            author: comment ? comment.author : '',
            body: comment ? comment.body : '',
            parentId: nexProps.match.params.postId,
            id: comment ? comment.id : ''
        })
    }

    componentWillMount() {
        this.setState({parentId: this.props.match.params.postId});
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

        const { error, author, body } = this.state;

        return (
            <div>
                <br />
                {error !== '' && ( <p style={styleErro}>{error}</p> )}

                <Form onSubmit={this.handleSubmit}>
                    
                    <Form.Field control={Input} label='Author' placeholder='Author'
                        name='author' value={author} onChange={this.onAuthorChange}
                    />
                    
                    <Form.TextArea label='Body' placeholder="What's happening?"
                        name='body' value={body} onChange={this.onBodyChange}
                    />

                    <Form.Button disabled={!author || !body}>Submit</Form.Button>
                    
                </Form>
            </div>
        )
    }
}

export default withRouter(connect()(CommentForm));