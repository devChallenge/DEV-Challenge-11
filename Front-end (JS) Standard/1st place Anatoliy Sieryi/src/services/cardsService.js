import { v4 } from 'uuid';
import { remove } from 'lodash';

import { getColumns } from './columnsService';

const storageName = 'my-board-cards';

export function seedCards(cards) {
	localStorage.setItem(storageName, JSON.stringify(cards));

	return cards;
}

export function moveCard(id, dir) {
	const cards = JSON.parse(localStorage.getItem(storageName)) || [];
	const card = cards.find(card => card.id === id);
	const columns = getColumns();

	if (card) {
		const index = columns.findIndex(column => column.id === card.column);

		if (index !== -1 && columns[index + dir]) {
			card.column = columns[index + dir].id;
			localStorage.setItem(storageName, JSON.stringify(cards));
		}
	}

	return cards;
}

export function getCards() {
	const cards = JSON.parse(localStorage.getItem(storageName)) || [];

	return cards;
}

export function addCard(data) {
	const cards = JSON.parse(localStorage.getItem(storageName)) || [];

	cards.push(Object.assign({ id: v4() }, data));

	localStorage.setItem(storageName, JSON.stringify(cards));

	return cards;
}

export function updateCard(data) {
	const cards = JSON.parse(localStorage.getItem(storageName)) || [];
	const card = cards.find(card => card.id === data.id);

	if (card) {
		Object.assign(card, data);
		localStorage.setItem(storageName, JSON.stringify(cards));
	}

	return cards;
}

export function archiveCard(id) {
	const cards = JSON.parse(localStorage.getItem(storageName)) || [];
	const card = cards.find(card => card.id === id);

	if (card) {
		Object.assign(card, { archived: true });
		localStorage.setItem(storageName, JSON.stringify(cards));
	}

	return cards;
}

export function restoreCard(id) {
	const cards = JSON.parse(localStorage.getItem(storageName)) || [];
	const card = cards.find(card => card.id === id);
	const columns = getColumns();

	if (card && columns.length) {
		Object.assign(card, {
			archived: false,
		});

		if (!columns.find(({ id }) => id === card.column)) {
			Object.assign(card, {
				column: columns[0].id,
			});
		}

		localStorage.setItem(storageName, JSON.stringify(cards));
	}

	return cards;
}

export function removeCard(id) {
	const cards = JSON.parse(localStorage.getItem(storageName)) || [];

	remove(cards, card => card.id === id);
	localStorage.setItem(storageName, JSON.stringify(cards));

	return cards;
}
