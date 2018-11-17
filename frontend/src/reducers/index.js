import { combineReducers } from 'redux';
import posts from './postReducer'
import { loadingBarReducer } from 'react-redux-loading';


const rootReducer = combineReducers({
    posts,
    loadingBar: loadingBarReducer
})
export default rootReducer;