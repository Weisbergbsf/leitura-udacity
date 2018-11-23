import React, { Component } from 'react'
import { Form, Select, Input } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listCategoriesAction, createPostAction } from '../actions/postActions';

import PostForm from './PostForm';


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
        //const { title, body, author } = this.state
        
        return (
            <div>
                <br/>
                <h3>New Post</h3>
                
                <PostForm 
                    onSubmitPost={(post) => {
                        this.props.createPostAction(post);
                        this.props.history.push('/')
                    }}
                />
                
            </div>
        )
    }
}

const mapStateToProps = state => ({ categories: state.posts.categories, posts: state.posts  })
const mapDispatchToProps = dispatch => bindActionCreators({
    listCategoriesAction,
    createPostAction,
},dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));