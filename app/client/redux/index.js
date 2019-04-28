import { combineReducers } from 'redux';
import publication from './publication'
import author from './author'

const rootReducer = combineReducers({
  publication,
  author
});

export default rootReducer
