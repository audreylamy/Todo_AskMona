import moment from 'moment';

export default function sortByProperty(array, prop) {
	var filtered = array.concat();
	filtered.sort(function(obj1, obj2) {
		let object1 = moment(obj1[prop])
		let object2 = moment(obj2[prop])
		return object1 - object2;
	});
	return filtered;
}