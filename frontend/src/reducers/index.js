import { combineReducers } from 'redux';
import posts from './postReducer';
import comments from './commentReducer'
import { loadingBarReducer } from 'react-redux-loading';

const rootReducer = combineReducers({
    posts,
    comments,
    loadingBar: loadingBarReducer
})
export default rootReducer;