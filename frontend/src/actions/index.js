import * as commentActions from './commentActions.js';
import * as postActions from './postActions.js';

export const actionCreators = Object.assign(
  {},
  commentActions,
  postActions
);