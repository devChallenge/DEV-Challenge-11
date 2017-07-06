/**
	 * Видалити із массива і вернути новий массив без видаленого елемента.
	 * 
	 * @param {Array} arr - массив з якого потрібно видалити
	 * @param {String} id - id елемента який потрібно видалити
	 */
export default function removeFromArrayById(arr, id) {
	const index = arr.map((i) => i.id).indexOf(id)
	
	return [
		...arr.slice(0, index),
		...arr.slice(index + 1),
	]
}
