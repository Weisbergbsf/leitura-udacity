import React, { Component } from 'react'
import { Form, Select, Input } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listCategoriesAction, createPostAction, postsAction, } from '../actions/postActions';

import uuid from 'uuid';

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        author: '',
        title: '',
        body: '',
        category: ''
    }

    handleChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChangeSelect(e, data) {
        this.setState({ category: data.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { author, title, body, category } = this.state

        let post = {
            //id: uuid.v1(),
            //timestamp: Date.now(),
            title: title,
            body: body,
            author: author,
            category: category
        }
        this.props.createPostAction(post)

        this.setState(() => ({
            author: '',
            title: '',
            body: '',
            category: ''
        }))
       
        this.props.history.push('/')
    }

    componentWillMount() {
        this.props.listCategoriesAction()
    }

    render() {
        const { title, body, author } = this.state
        const postLeft = 280 - body.length

        const list = this.props.categories.categories || [];
        const optionCategories = [];
        list.map(category => {
            return optionCategories.push({ key: category.name, text: category.name, value: category.name })
        })
        return (
            <div>
                <br/>
                <h3>New Post</h3>

                <Form onSubmit={this.handleSubmit}>
                
                    <Form.Field control={Input} label='Author' placeholder='Author'
                        name='author' value={author} onChange={this.handleChangeInput}
                    />
                    <Form.Field control={Input} label='Title' placeholder='Title'
                        name='title' value={title} onChange={this.handleChangeInput}
                    />
                    <Form.Field control={Select} label='Caterory' 
                        name='category' onChange={this.handleChangeSelect}
                        options={optionCategories} placeholder='Category'
                    />
                    <Form.TextArea label='Body' placeholder="What's happening?"
                        name='body' value={body} onChange={this.handleChangeInput}
                        maxLength={280}
                    />
                    {postLeft <= 100 && (
                        <div>
                            {postLeft}
                        </div>
                    )}
                    <Form.Button disabled={body === ''}>Submit</Form.Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({ categories: state.posts.categories, posts: state.posts  })
//const mapStateToProps = ({ posts }) => ({ posts })
const mapDispatchToProps = dispatch => bindActionCreators({
    listCategoriesAction,
    createPostAction,
    postsAction,
},dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));