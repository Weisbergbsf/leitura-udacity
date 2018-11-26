
import * as Api from '../util/api'
import {
    LIST_COMMENTS_BY_POST,
    CREATE_COMMENT,
    GET_COMMENT_BY_ID
} from './types';
import { showLoading, hideLoading } from 'react-redux-loading';
import uuid from 'uuid';


export const createCommentAction = (commentReq) => {
    console.log('commentReq ',commentReq)
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
        })
    }
}

export const commentById = (comment_id) => {
    return (dispatch) => {
        Api.getCommentById(comment_id).then(comment => {
            dispatch({ type: GET_COMMENT_BY_ID, comment })
        })
    }
}


/*
GET /posts/:id/comments
      USAGE:
        Get all the comments for a single post
*/
// Comments
export const listCommentsByPostAction = (post_id) => {
    return (dispatch) => {
        Api.getCommnetsByPost(post_id).then(comments => {
            dispatch({ type: LIST_COMMENTS_BY_POST, comments })
        })
    }
}

