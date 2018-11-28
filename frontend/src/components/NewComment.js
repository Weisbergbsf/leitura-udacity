import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createCommentAction } from '../actions/commentActions';

import CommentForm from './CommentForm';

class NewComment extends Component {

    render() {
        let category = this.props.match.params.category
        let postId = this.props.match.params.postId
        return (
            <div>
                <h3>New Comment</h3>
                <CommentForm 
                    onSubmitComment={(comment) => {
                        this.props.createCommentAction(comment);
                        this.props.history.push(`/${category}/${postId}`)
                    }}
                />
                
            </div>
        )
    }
}

const mapStateToProps = state => ({ posts: null  })
const mapDispatchToProps = dispatch => bindActionCreators({
    createCommentAction
},dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment));