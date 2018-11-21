import { LIST_POSTS, LIST_POSTS_BY_CATEGORY, LIST_CATEGORIES, DELETE_POST, VOTE_POST, CREATE_POST, SORT_POST } from '../actions/types';

const INITIAL_STATE = {

    posts: [],
    categories: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_CATEGORIES:
            return { ...state, categories: action.categories }
        case LIST_POSTS_BY_CATEGORY:
            return { ...state, category: action.category, posts: action.posts }
        case LIST_POSTS:
            return { ...state, posts: action.posts }
        case CREATE_POST:
            return { 
                ...state, 
                posts: [...state.posts, action.post]
            }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(post => post.id !== action.post_id) }
        case VOTE_POST:
            return {
                ...state, 
                posts: state.posts.map(post => {
                    if (post.id === action.post_id) {
                        post.voteScore = post.voteScore + action.vote
                    }
                    return post;
                })
            }
        case SORT_POST:
            return { 
                ...state,
                posts: state.posts.sort((a,b) => {
                    if(action.sortBy === 'vote') {
                        return b.voteScore - a.voteScore
                    } else{
                        return b.timestamp - a.timestamp
                    }
                })
                
                
                //list.sort((a,b) => b.voteScore - a.voteScore)
            }
        default:
            return state;
    }

}