
import * as Api from '../util/api'
import {
    LIST_COMMENTS_BY_POST,
    CREATE_COMMENT,
    GET_COMMENT_BY_ID,
    EDIT_COMMENT,
    SHOW_FORM_EDIT_COMMENT,
    SHOW_FORM_ADD_COMMENT
} from './types';
import { showLoading, hideLoading } from 'react-redux-loading';
import uuid from 'uuid';


export const createCommentAction = (commentReq) => {
    let comment = {
        id: uuid(),
        timestamp: Date.now(),
        body: commentReq.body,
        author: commentReq.author,
        parentId: commentReq.parentId
    }

    return (dispatch) => {

        Api.createComment(comment).then(() => {
            dispatch({ type: CREATE_COMMENT, comment })
            dispatch(showFormAddComment(false))
        })
    }
}

export const commentById = (comment_id) => {
    return (dispatch) => {
        dispatch(showFormEditComment(true))
        Api.getCommentById(comment_id).then(comment => {
            dispatch({ type: GET_COMMENT_BY_ID, comment })
        })
    }
}

export const editCommentAction = (id, comment) => {
    let commentUp = {
        id: id,
        timestamp: Date.now(),
        author: comment.author,
        body: comment.body
    }
    return (dispatch) => {
        Api.editComment(commentUp).then(() => {
            dispatch({ type: EDIT_COMMENT, id, comment })
            dispatch(showFormEditComment(false))
        })
    }
}

export const showFormEditComment = (bool) => {
    return { type: SHOW_FORM_EDIT_COMMENT, formEdit: bool }
}

export const showFormAddComment = (bool) => {
    return { type: SHOW_FORM_ADD_COMMENT, formAdd: bool }
}

export const listCommentsByPostAction = (post_id) => {
    return (dispatch) => {
        Api.getCommnetsByPost(post_id).then(comments => {
            dispatch({ type: LIST_COMMENTS_BY_POST, comments })
        })
    }
}

