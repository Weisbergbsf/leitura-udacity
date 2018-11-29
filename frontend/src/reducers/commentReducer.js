import { 
    CREATE_COMMENT, 
    GET_COMMENT_BY_ID, 
    LIST_COMMENTS_BY_POST, 
    EDIT_COMMENT, 
    SHOW_FORM_EDIT_COMMENT, 
    SHOW_FORM_ADD_COMMENT, 
    DELETE_COMMENT, 
    VOTE_COMMENT 
} from '../actions/action-types';

const INITIAL_STATE = {
    comment: {},
    comments: [],
    formEdit: false,
    formAdd: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CREATE_COMMENT:
            return { ...state, comments: [...state.comments, action.comment] }
        case GET_COMMENT_BY_ID:
            return { ...state, comment: action.comment }
        case LIST_COMMENTS_BY_POST:
            return { ...state, comments: action.comments }
        case EDIT_COMMENT:
            return state.comments.map((comment) => {
                if (comment.id === action.id) {
                    return { ...state, comments: [...state.comments, action.comment] }
                }
                return comment;
            })
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.comment_id)
            }
        case VOTE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.comment_id) {
                        comment.voteScore = comment.voteScore + action.vote
                        state.comment = comment
                    }
                    return comment;
                }),
            }
        case SHOW_FORM_EDIT_COMMENT:
            return { ...state, formEdit: action.formEdit }
        case SHOW_FORM_ADD_COMMENT:
            return { ...state, formAdd: action.formAdd }
        default:
            return state;
    }

}