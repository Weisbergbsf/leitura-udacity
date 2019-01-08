import React, { Component } from 'react';
import { Form, Select, Input } from 'semantic-ui-react';

import { menuAction } from '../actions/menuAction';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styleErro = {
    color: 'red',
    fontWeight: 'bold'
}

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        title: '',
        author: '',
        category: '',
        body: '',
        error: ''
    }

    componentWillReceiveProps(nexProps) {
        let post = nexProps.post;
        this.setState({
            title: post ? post.title : '',
            author: post ? post.author : '',
            category: post ? post.category : '',
            body: post ? post.body : ''
        })
    }

    onAuthorChange(e) {
        const author = e.target.value;
        this.setState(() => ({ author }));
    }

    onTitleChange(e) {
        const title = e.target.value;
        this.setState(() => ({ title }));
    }

    onCategoryChange(e, data) {
        this.setState(() => ({ category: data.value }));
    }

    onBodyChange(e) {
        const body = e.target.value;
        this.setState(() => ({ body }));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.title || !this.state.author || !this.state.body) {
            this.setState(() => ({ error: 'Please, set author & title & category & description!' }));
        } else {
            this.setState(() => ({ error: '' }));

            this.props.onSubmitPost({
                author: this.state.author,
                title: this.state.title,
                category: this.state.category,
                body: this.state.body
            });
            //Redirect to posts
            //this.props.history.push('/')
            this.props.menuAction('posts')
        }
    }

    render() {
        const { error, author, title, category, body } = this.state;
        const categories = this.props.categories.categories || [];
        const optionCategories = [];
        categories.map(category => {
            return optionCategories.push({ key: category.name, text: category.name, value: category.name })
        })
        return (
            <div>
                <br />
                {error !== '' && ( <p style={styleErro}>{error}</p>)}

                <Form onSubmit={this.handleSubmit}>

                    <Form.Field control={Input} label='Author' placeholder='Author'
                        name='author' value={author} onChange={this.onAuthorChange}
                    />
                    <Form.Field control={Input} label='Title' placeholder='Title'
                        name='title' value={title} onChange={this.onTitleChange}
                    />
                    <Form.Field control={Select} label='Caterory'
                        name='category' onChange={this.onCategoryChange} value={category}
                        options={optionCategories} placeholder='Category'
                    />
                    <Form.TextArea label='Body' placeholder="What's happening?"
                        name='body' value={body} onChange={this.onBodyChange}
                    />

                    <Form.Button primary disabled={!author || !title || !category || !body}>Submit</Form.Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({ categories: state.posts.categories });
const mapDispathcToProps = dispatch => bindActionCreators({ menuAction }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispathcToProps)(PostForm));