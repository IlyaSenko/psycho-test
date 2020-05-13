import {combineReducers} from 'redux';

import sections from './sections';
import user from './user';
import students from './students';

export default combineReducers({
  sections,
  user,
  students
});
