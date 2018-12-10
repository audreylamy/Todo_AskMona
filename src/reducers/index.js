import { combineReducers } from 'redux';
import todoReducer from './reducer_todo';

// mapping of our state
const appReducer = combineReducers({
    tasks: todoReducer
});

export default appReducer;