import axios from 'axios';
import sortByProperty from '../utils/sortFunction';

export const SEARCHALL = 'SEARCHALL';

const INITIAL_STATE = {
	allTasks: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case SEARCHALL:
        return { ...state, allTasks: action.payload};
      default:
        return state;
    }
}

export function alltasksAction() {
	return async (dispatch) => {
		try {
			const allTasks = await axios.get("https://todo-test-mona.herokuapp.com/tasks")
			const res = await sortByProperty(allTasks.data, "created_at");
			dispatch({ 
				type: SEARCHALL,
				payload: res
			});
		} catch (err) {
			console.log(err)
		}
	}
}