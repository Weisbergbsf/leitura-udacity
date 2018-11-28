import { CREATE_COMMENT, GET_COMMENT_BY_ID, LIST_COMMENTS_BY_POST, EDIT_COMMENT, SHOW_FORM_EDIT_COMMENT, SHOW_FORM_ADD_COMMENT } from '../actions/types';

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
                    console.log(comment, ' aciont id ', action.id)
                    return { ...state, comments: [...state.comments, action.comment] }
                }
            })
        case SHOW_FORM_EDIT_COMMENT:
            return { ...state, formEdit: action.formEdit }
        case SHOW_FORM_ADD_COMMENT:
            return { ...state, formAdd: action.formAdd }
        default:
            return state;
    }

}