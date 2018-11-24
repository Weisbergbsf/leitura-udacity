import React,  { Component } from 'react';
import { Form, Select, Input } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listCategoriesAction, createPostAction } from '../actions/postActions';

const styleErro = {
    color: 'red',
    fontWeight: 'bold'
}

class PostForm extends Component {

    state = {
        title: '',
        author: '',
        category: '',
        body: '',

        error: ''
      }

      componentWillReceiveProps(nexProps) {
        let post = nexProps.post
        this.setState({
            title: post ? post.title : '',
            author: post ? post.author : '',
            category: post ? post.category : '',
            body: post ? post.body : ''
        })
    }
   
    constructor(props) {
        super(props);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onAuthorChange(e) {
        const author = e.target.value;
        this.setState(() => ({ author: author }));
    }

    onTitleChange(e) {
        const title = e.target.value;
        this.setState(() => ({ title: title }));
    }

    onCategoryChange(e, data) {
        this.setState(() => ({ category: data.value }));
    }

    onBodyChange(e) {
        const body = e.target.value;
        this.setState(() => ({ body: body }));
    }

    handleSubmit(e) {
        e.preventDefault();
        

        if (!this.state.title || !this.state.author || !this.state.body ) {
            this.setState(() => ({ error: 'Please, set author & title & category & description!' }));
        } else {
            this.setState(() => ({ error: '' }));
            
            this.props.onSubmitPost(
                {
                    author: this.state.author,
                    title: this.state.title,
                    category: this.state.category,
                    body: this.state.body
                }
            );
        }
    }


    render() {

        const list = this.props.categories.categories || [];
        const optionCategories = [];
        list.map(category => {
            return optionCategories.push({ key: category.name, text: category.name, value: category.name })
        })
        return (
            <div>
                <br/>
                {this.state.error !== '' && (
                    <p style={styleErro}>{this.state.error}</p>
                )}

                <Form onSubmit={this.handleSubmit}>
                
                    <Form.Field control={Input} label='Author' placeholder='Author'
                        name='author' value={this.state.author} onChange={this.onAuthorChange}
                    />
                    <Form.Field control={Input} label='Title' placeholder='Title'
                        name='title' value={this.state.title} onChange={this.onTitleChange}
                    />
                    <Form.Field control={Select} label='Caterory' 
                        name='category' onChange={this.onCategoryChange} value={this.state.category}
                        options={optionCategories} placeholder='Category'
                    />
                    <Form.TextArea label='Body' placeholder="What's happening?"
                        name='body' value={this.state.body} onChange={this.onBodyChange}
                    />
                    
                    <Form.Button
                        disabled={
                            !this.state.author || 
                            !this.state.title || 
                            !this.state.category ||
                            !this.state.body}
                    >Submit</Form.Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({ categories: state.posts.categories, posts: state.posts  })
const mapDispatchToProps = dispatch => bindActionCreators({
    listCategoriesAction,
    createPostAction,
},dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));