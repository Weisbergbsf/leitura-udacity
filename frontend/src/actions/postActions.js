
import * as Api from '../util/api'
import {
    LIST_POSTS,
    LIST_POSTS_BY_CATEGORY,
    LIST_CATEGORIES,
    DELETE_POST,
    VOTE_POST,
    CREATE_POST,
    SORT_POST,
    EDIT_POST,
    GET_POST_BY_ID,
    LIST_COMMENTS_BY_POST
} from './types';
import { showLoading, hideLoading } from 'react-redux-loading';
import uuid from 'uuid';

export const postsAction = () => {
    return (dispatch) => {
        dispatch(showLoading())
        Api.getPosts().then(response => {
            dispatch({ type: LIST_POSTS, posts: response })
            dispatch(listCategoriesAction())
            dispatch(sortPostAction('voteScore'))
            dispatch(hideLoading())
        })
    }
}

export const postById = (post_id) => {
    return (dispatch) => {
        Api.getPostById(post_id).then(response => {
            dispatch({ type: GET_POST_BY_ID, post: response })
        })
    }
}

export const createPostAction = (postReq) => {
    let post = {
        id: uuid(),
        timestamp: Date.now(),
        title: postReq.title,
        body: postReq.body,
        author: postReq.author,
        category: postReq.category
    }

    return (dispatch) => {
        Api.createPost(post).then(() => {
            dispatch({ type: CREATE_POST, post })
        })
    }
}

export const postsByCategoriaAction = (category) => {
    return (dispatch) => {
        Api.getPostsByCategoria(category).then(response => {
            dispatch({ type: LIST_POSTS_BY_CATEGORY, category: category, posts: response })
        })
    }
}

export const editPostAction = (id, post) => {
    let postUp = {
        id: id,
        author: post.author,
        title: post.title,
        category: post.category,
        body: post.body
    }
    return (dispatch) => {
        Api.editPost(postUp).then(dispatch({ type: EDIT_POST, id, post }))
    }
}

export const deletePostAction = (post_id) => {
    return (dispatch) => {
        Api.deletePost(post_id).then(dispatch({ type: DELETE_POST, post_id }))
    }
}

export const votePostAction = (post_id, option) => {
    let vote = (option === 'upVote') ? 1 : -1
    return (dispatch) => {
        Api.votePost(post_id, { option }).then(() => {
            dispatch({ type: VOTE_POST, vote, post_id })
        })
    }
}

export const sortPostAction = (sortBy) => {
    return { type: SORT_POST, sortBy }
}

export const listCategoriesAction = () => {
    return (dispatch) => {
        Api.getCategories().then(categories => {
            dispatch({ type: LIST_CATEGORIES, categories })
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

