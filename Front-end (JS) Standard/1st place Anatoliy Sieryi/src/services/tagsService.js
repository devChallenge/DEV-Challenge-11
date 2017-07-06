import { v4 } from 'uuid';
import { remove } from 'lodash';

import { getCards, seedCards } from './cardsService.js';

const storageName = 'my-board-tags';

export function seedTags(tags) {
	localStorage.setItem(storageName, JSON.stringify(tags));

	return tags;
}

export function getTags() {
	const tags = JSON.parse(localStorage.getItem(storageName)) || [];

	return tags;
}

export function addTag(data) {
	const tags = JSON.parse(localStorage.getItem(storageName)) || [];

	tags.push(Object.assign({ id: v4() }, data));

	localStorage.setItem(storageName, JSON.stringify(tags));

	return tags;
}

export function updateTag(data) {
	const tags = JSON.parse(localStorage.getItem(storageName)) || [];
	const tag = tags.find(tag => tag.id === data.id);

	if (tag) {
		Object.assign(tag, data);
		localStorage.setItem(storageName, JSON.stringify(tags));
	}

	return tags;
}

export function removeTag(id) {
	const tags = JSON.parse(localStorage.getItem(storageName)) || [];
	const cards = getCards();

	for (const card of cards) {
		remove(card.tags, tagId => tagId === id);
	}
	remove(tags, tag => tag.id === id);

	seedCards(cards);

	localStorage.setItem(storageName, JSON.stringify(tags));

	return {
		tags,
		cards,
	};
}
