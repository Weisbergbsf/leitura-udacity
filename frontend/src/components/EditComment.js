import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { commentById } from '../actions/commentActions';
import CommentForm from './CommentForm';

class EditComment extends Component {

    render() {
        //let post_id = this.props.match.params.id;
        console.log(this.props)
        return (
            <div>
                <CommentForm
                    comment={this.props.comment}
                    onSubmitPost={post => {
                        //this.props.editPostAction(post_id, post);
                        //this.props.history.push('/')
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({ comment: state.comments.comment })

const mapDispatchToProps = dispatch => bindActionCreators({
    commentById
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(EditComment);