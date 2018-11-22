import { LIST_POSTS, LIST_POSTS_BY_CATEGORY, LIST_CATEGORIES, DELETE_POST, VOTE_POST, CREATE_POST, SORT_POST } from '../actions/types';

const INITIAL_STATE = {

    posts: [],
    sortBy: 'voteScore',
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
               // sortBy: action.sortBy
                
                posts: state.posts.sort((a, b) => {
                    if (action.sortBy === 'voteScore') {
                        return b.voteScore < a.voteScore ? -1 : 1
                    } else if (action.sortBy === 'timestamp') {
                        let dateA = new Date(a.timestamp)
                        let dateB = new Date(b.timestamp)
                        return dateA > dateB ? -1 : 1;
                    }
                    return 0;
                })
            }
        default:
            return state;
    }

}