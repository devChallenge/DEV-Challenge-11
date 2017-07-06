import { v4 } from 'uuid';
import { remove } from 'lodash';

const storageName = 'my-board-columns';

export function seedColumns(columns) {
	localStorage.setItem(storageName, JSON.stringify(columns));

	return columns;
}

export function getColumns() {
	const columns = JSON.parse(localStorage.getItem(storageName)) || [];

	return columns;
}

export function addColumn(data) {
	const columns = JSON.parse(localStorage.getItem(storageName)) || [];

	columns.push(Object.assign({ id: v4() }, data));

	localStorage.setItem(storageName, JSON.stringify(columns));

	return columns;
}

export function moveColumn(id, dir) {
	const columns = JSON.parse(localStorage.getItem(storageName)) || [];
	const index = columns.findIndex(column => column.id === id);

	if (index !== -1) {
		const column = columns.splice(index, 1)[0];
		columns.splice(index + dir, 0, column);
		localStorage.setItem(storageName, JSON.stringify(columns));
	}

	return columns;
}

export function updateColumn(data) {
	const columns = JSON.parse(localStorage.getItem(storageName)) || [];
	const column = columns.find(column => column.id === data.id);

	if (column) {
		Object.assign(column, data);
		localStorage.setItem(storageName, JSON.stringify(columns));
	}

	return columns;
}

export function removeColumn(id) {
	const columns = JSON.parse(localStorage.getItem(storageName)) || [];

	remove(columns, column => column.id === id);
	localStorage.setItem(storageName, JSON.stringify(columns));

	return columns;
}
