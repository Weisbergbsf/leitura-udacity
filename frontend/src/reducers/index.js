import { combineReducers } from 'redux';
import menu from './menuReducer'
import posts from './postReducer';
import comments from './commentReducer'
import { loadingBarReducer } from 'react-redux-loading';

const rootReducer = combineReducers({
    menu,
    posts,
    comments,
    loadingBar: loadingBarReducer
})
export default rootReducer;