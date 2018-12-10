import axios from 'axios';
import moment from 'moment';

export const SEARCHALL = 'SEARCHALL';

export default function(state = null, action) {
    switch(action.type) {
      case SEARCHALL:
        return { ...state, allTasks: action.payload};
      default:
        return state;
    }
}

function sortByProperty(array, prop) {
	var filtered = array.concat();
	filtered.sort(function(obj1, obj2) {
		let object1 = moment(obj1[prop])
		let object2 = moment(obj2[prop])
		return object1 - object2;
	});
	return filtered;
}


export function alltasksAction() {
	return async (dispatch) => {
		try {
			const allTasks = await axios.get("https://todo-test-mona.herokuapp.com/tasks")
			const res = sortByProperty(allTasks.data, "created_at");
			dispatch({ 
				type: SEARCHALL,
				payload: res
			});
		} catch (err) {
			console.log(err)
		}
	}
}