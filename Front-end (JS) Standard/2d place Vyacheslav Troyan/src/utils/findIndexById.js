/**
	 * Знайти індекс елемента по  id
	 * 
	 * @param {Array} arr - массив в якому потірібно найти
	 * @param {String} id - id елемента
	 */
export default function findIndexById(arr, id) {
	let index = false

	arr.forEach((element, i) => {
		if(element.id === id)  {			
			index = i
		}
	})

	return index
}
