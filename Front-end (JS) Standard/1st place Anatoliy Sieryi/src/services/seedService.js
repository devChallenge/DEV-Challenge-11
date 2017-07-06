import { v4 } from 'uuid';

import { seedColumns } from './columnsService';
import { seedTags } from './tagsService';
import { seedCards } from './cardsService';

const storageName = 'my-board-status';

export function getStatus() {
	const status = JSON.parse(localStorage.getItem(storageName));

	return status;
}

export function seedData() {
	const columns = [{
		id: v4(),
		name: 'To do',
	}, {
		id: v4(),
		name: 'In progress',
	}, {
		id: v4(),
		name: 'Done',
	}];

	const tags = [{
		id: v4(),
		name: 'Important',
		color: '#ff9800',
	}];

	const cards = [{
		id: v4(),
		column: columns[0].id,
		name: 'Example card',
		description: 'Example description',
		tags: [tags[0].id]
	}];

	seedColumns(columns);
	seedTags(tags);
	seedCards(cards);

	localStorage.setItem(storageName, JSON.stringify(true));

	return { columns, cards };
}