
import * as Api from '../util/api'
import { LIST_POSTS, LIST_POSTS_BY_CATEGORY, LIST_CATEGORIES, DELETE_POST, VOTE_POST } from './types';
import { showLoading, hideLoading } from 'react-redux-loading';


export const postsAction = () => {
    return (dispatch) => {
        dispatch(showLoading())
        Api.getPosts().then(response => {
            dispatch({ type: LIST_POSTS, posts: response })
            dispatch(hideLoading())
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

export const deletePostAction = (post_id) => {
    return (dispatch) => {
        Api.deletePost(post_id).then(
            dispatch({ type: DELETE_POST, post_id })
        )
    }
}
export const votePostAction = (post_id, option) => {
    let vote = (option === 'upVote') ? 1 : -1
    return (dispatch) => {
        Api.votePost(post_id, { option }).then(() => {
            dispatch({ type: VOTE_POST, vote, post_id })
        }
        )
    }
}

export const listCategoriesAction = () => {
    return (dispatch) => {
        Api.getCategories().then(response => {
            dispatch({ type: LIST_CATEGORIES, categories: response })
        })
    }
}

