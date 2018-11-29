
import * as Api from '../util/api';
import {
    LIST_COMMENTS_BY_POST,
    CREATE_COMMENT,
    GET_COMMENT_BY_ID,
    EDIT_COMMENT,
    SHOW_FORM_EDIT_COMMENT,
    SHOW_FORM_ADD_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT
} from './action-types';
import uuid from 'uuid';

import { postById } from './postActions';

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
            dispatch(listCommentsByPostAction(comment.parentId))
            dispatch(postById(comment.parentId))
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
            dispatch(showFormAddComment(false))
        })
    }
}

export const voteCommentAction = (comment_id, option) => {
    let vote = (option === 'upVote') ? 1 : -1
    return (dispatch) => {
        Api.voteComment(comment_id, { option }).then(() => {
            dispatch({ type: VOTE_COMMENT, vote, comment_id })
        })
    }
}

export const deleteCommentAction = (comment) => {
    return (dispatch) => {
        Api.deleteComment(comment.id).then(() => {
            dispatch({ type: DELETE_COMMENT, comment_id: comment.id })
            dispatch(postById(comment.parentId))
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

