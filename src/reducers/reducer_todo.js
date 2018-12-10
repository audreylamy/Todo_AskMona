import axios from 'axios';

export const SEARCHALL = 'SEARCHALL';

export default function(state = null, action) {
    switch(action.type) {
      case SEARCHALL:
        return { ...state, allTasks: action.payload};
      default:
        return state;
    }
}

export function alltasksAction() {
	return async (dispatch) => {
				const allTasks = await axios.get("https://todo-test-mona.herokuapp.com/tasks")
				console.log(allTasks)
		if (allTasks != null) {
			dispatch({ 
				type: SEARCHALL,
				payload: allTasks
			});
		} 
	}
}