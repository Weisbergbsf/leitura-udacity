import { CREATE_COMMENT, GET_COMMENT_BY_ID } from '../actions/types';

const INITIAL_STATE = {

    posts: [],
    comment: {},
    sortBy: 'voteScore',
    categories: [],
    comments: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case CREATE_COMMENT:
            return { ...state, comments: [...state.comments, action.comment] }
        case GET_COMMENT_BY_ID:
            return { ...state, comment: action.comment }
        
        default:
            return state;
    }

}