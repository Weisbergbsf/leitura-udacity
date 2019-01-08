import { CHANGE_MENU } from '../actions/action-types';

const INITIAL_STATE = {
    activeItem: 'posts'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CHANGE_MENU:
            return { ...state, activeItem: action.name } 
        default:
            return state;
    }
}