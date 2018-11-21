import { combineReducers } from 'redux';
import posts from './postReducer'
//import * as Api from '../util/api'
import { loadingBarReducer } from 'react-redux-loading';


const rootReducer = combineReducers({
    posts,
    loadingBar: loadingBarReducer
})
export default rootReducer;