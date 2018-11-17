import { LIST_POSTS, LIST_POSTS_BY_CATEGORY, LIST_CATEGORIES, DELETE_POST, VOTE_POST } from '../actions/types';

const INITIAL_STATE = {

    posts: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_CATEGORIES:
            return { ...state, categories: action.categories }
        case LIST_POSTS_BY_CATEGORY:
            return { ...state, category: action.category, posts: action.posts }
        case LIST_POSTS:
            return { ...state, posts: action.posts }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(post => post.id !== action.post_id) }
        case VOTE_POST:
            return {
                ...state, 
                posts: state.posts.map(post => {
                    if (post.id === action.post_id) {
                        post.voteScore = post.voteScore + action.vote
                       console.log('=> ',post)
                    }
                    return post;
                })
                
            }
        default:
            return state;
    }

}