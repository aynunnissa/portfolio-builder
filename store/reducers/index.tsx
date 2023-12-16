import { combineReducers } from 'redux';
import portfolioSlideReducer from './portfolio';
import profileSlideReducer from './profile';

const reducers = combineReducers({
  portfolioStore: portfolioSlideReducer,
  profileStore: profileSlideReducer,
});

export default reducers;
