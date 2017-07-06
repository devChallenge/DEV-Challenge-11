import React, { Component } from 'react';
import { Input, Button, Label } from 'semantic-ui-react';

import Column from '../Column/Column';
import ModalCardForm from '../ModalCardForm/ModalCardForm';
import ModalTagForm from '../ModalTagForm/ModalTagForm';
import ModalColumnForm from '../ModalColumnForm/ModalColumnForm';
import { getColumns, addColumn, updateColumn, removeColumn, moveColumn } from '../../services/columnsService';
import { getCards, addCard, updateCard, archiveCard, restoreCard, removeCard, moveCard } from '../../services/cardsService';
import { getTags, addTag, updateTag, removeTag } from '../../services/tagsService';
import './Board.css';

class Board extends Component {
	constructor() {
		super();
		this.addCard = this.addCard.bind(this);
		this.updateCard = this.updateCard.bind(this);
		this.archiveCard = this.archiveCard.bind(this);
		this.restoreCard = this.restoreCard.bind(this);
		this.removeCard = this.removeCard.bind(this);
		this.searchCards = this.searchCards.bind(this);
		this.openModalCard = this.openModalCard.bind(this);
		this.closeModalCard = this.closeModalCard.bind(this);
		this.addTag = this.addTag.bind(this);
		this.updateTag = this.updateTag.bind(this);
		this.removeTag = this.removeTag.bind(this);
		this.openModalTag = this.openModalTag.bind(this);
		this.closeModalTag = this.closeModalTag.bind(this);
		this.toggleTags = this.toggleTags.bind(this);
		this.toggleArchive = this.toggleArchive.bind(this);
		this.moveColumn = this.moveColumn.bind(this);
		this.openModalColumn = this.openModalColumn.bind(this);
		this.closeModalColumn = this.closeModalColumn.bind(this);
		this.addColumn = this.addColumn.bind(this);
		this.updateColumn = this.updateColumn.bind(this);
		this.removeColumn = this.removeColumn.bind(this);
		this.moveCard = this.moveCard.bind(this);

		this.state = {
			columns: getColumns(),
			cards: getCards(),
			modalCardOpen: false,
			card: null,
			showTags: false,
			showArchive: false,
			tags: getTags(),
			modalTagOpen: false,
			tag: null,
			search: '',
			column: null,
			modalColumnOpen: false,
		};
	}

	openModalCard({ id, name, description, column, tags, archived }) {
		this.setState({
			modalCardOpen: true,
			card: {
				id,
				name,
				description,
				column,
				tags,
				archived,
			},
		});

		setTimeout(() => document.getElementById('form-card-name').focus());
	}

	addCard({ name, description, column, tags, archived }) {
		this.closeModalCard(addCard({
			name,
			description,
			column,
			tags,
			archived,
		}));
	}

	updateCard({ id, name, description, column, tags, archived }) {
		this.closeModalCard(updateCard({
			id,
			name,
			description,
			column,
			tags,
			archived,
		}));
	}

	archiveCard(id) {
		this.closeModalCard(archiveCard(id));
	}

	restoreCard(id) {
		this.setState({
			cards: restoreCard(id),
		});
	}
	
	removeCard(id) {
		this.closeModalCard(removeCard(id));
	}

	closeModalCard(cards) {
		const nextState = {
			modalCardOpen: false,
			event: null,
		};

		cards && Object.assign(nextState, { cards });
		this.setState(nextState);
	}

	toggleTags() {
		const { showTags } = this.state;

		this.setState({
			showTags: !showTags,
			showArchive: false,
		});
	}

	toggleArchive() {
		const { showArchive } = this.state;

		this.setState({
			showArchive: !showArchive,
			showTags: false,
		});
	}

	openModalTag({ id, name, color }) {
		this.setState({
			modalTagOpen: true,
			tag: {
				id,
				name,
				color,
			},
		});

		setTimeout(() => document.getElementById('form-tag-name').focus());
	}

	closeModalTag(tags) {
		const nextState = {
			modalTagOpen: false,
		};

		tags && Object.assign(nextState, { tags });
		this.setState(nextState);
	}

	addTag({ name, color }) {
		this.closeModalTag(addTag({
			name,
			color,
		}));
	}

	updateTag({ id, name, color }) {
		this.closeModalTag(updateTag({
			id,
			name,
			color,
		}));
	}

	removeTag(id) {
		const { tags, cards } = removeTag(id);
		const nextState = {
			modalTagOpen: false,
			cards,
		};

		tags && Object.assign(nextState, { tags });
		this.setState(nextState);
	}

	moveColumn(id, dir) {
		this.setState({
			columns: moveColumn(id, dir),
		});
	}

	moveCard(id, dir) {
		this.setState({
			cards: moveCard(id, dir),
		});
	}

	openModalColumn({ id, name }) {
		this.setState({
			modalColumnOpen: true,
			column: {
				id,
				name,
			},
		});

		setTimeout(() => document.getElementById('form-column-name').focus());
	}

	closeModalColumn(columns) {
		const nextState = {
			modalColumnOpen: false,
		};

		columns && Object.assign(nextState, { columns });
		this.setState(nextState);
	}

	addColumn({ name }) {
		this.closeModalColumn(addColumn({
			name,
		}));
	}

	updateColumn({ id, name }) {
		this.closeModalColumn(updateColumn({
			id,
			name,
		}));
	}

	removeColumn(id) {
		this.closeModalColumn(removeColumn(id));
	}

	searchCards(e, { value }) {
		this.setState({
			search: value,
		});
	}

	render() {
		const {
			columns,
			cards,
			card,
			modalCardOpen,
			showTags,
			showArchive,
			tags,
			tag,
			modalTagOpen,
			search,
			column,
			modalColumnOpen,
		} = this.state;
		const searchText = search.trim().toLowerCase();
		const archivedCards = cards.filter(({ archived }) => archived === true);

		return (
			<div className="board">
				<div className="tools">
					<div className="tool">
						<Input
							placeholder="Type in to search cards..."
							value={search}
							onChange={this.searchCards}
						/>
					</div>
					<div className="tool">
						<Button onClick={this.toggleTags}>
							{
								showTags ?
								'Hide tags settings' :
								'Show tags settings'
							}
						</Button>
					</div>
					<div className="tool">
						<Button onClick={this.toggleArchive}>
							{
								showArchive ?
								'Hide archived cards' :
								'Show archived cards'
							}
						</Button>
					</div>
				</div>
				{
					showTags &&
					<div className="all-tags">
						{
							tags.map(tag => (
								<Label
									key={tag.id}
									horizontal
									style={{
										background: tag.color,
										cursor: 'pointer',
									}}
									onClick={this.openModalTag.bind(this, tag)}
								>
									{tag.name}
								</Label>
							))
						}
						{
							!tags.length &&
							<div className="no-data-placeholder">
								<i>no tags found</i>
							</div>
						}
						<Button basic size="mini" onClick={this.openModalTag.bind(this, {
							color: '#009688',
						})}>
							Add new
						</Button>
					</div>
				}
				{
					showArchive &&
					<div className="archive-cards">
						{
							archivedCards.map(card => {
								const column = columns.find(({ id }) => id === card.column);

								return (
									<div
										key={card.id}
										className="archived-card"
									>
										<div>
											{
												`Name: ${card.name}`
											}
										</div>
										<div>
											{
												`Column: ${column ? column.name : 'DELETED'}`
											}
										</div>
										<div className="restore-button">
											<Button.Group size="mini" basic>
												<Button
													onClick={this.restoreCard.bind(this, card.id)}
													disabled={!columns.length}
												>
													Restore
												</Button>
												<Button
													onClick={this.removeCard.bind(this, card.id)}
												>
													Delete
												</Button>
											</Button.Group>
										</div>
									</div>
								)
							})
						}
						{
							!archivedCards.length &&
							<div className="no-data-placeholder">
								<i>no archived cards found</i>
							</div>
						}
					</div>
				}
				<div className="columns">
					{
						columns.length ?
						columns.map((column, index) => (
							<Column
								key={column.id}
								column={column}
								cards={cards.filter(card => (
									card.column === column.id &&
									!card.archived &&
									card.name.toLowerCase().indexOf(searchText) !== -1
								))}
								tags={tags}
								searchText={searchText}
								openModalCard={this.openModalCard}
								archiveCard={this.archiveCard}
								removeCard={this.removeCard}
								moveColumn={this.moveColumn.bind(this, column.id)}
								moveCard={this.moveCard}
								first={index === 0}
								last={index === columns.length - 1}
								editColumn={this.openModalColumn.bind(this, column)}
							/>
						)) :
						<div className="no-data-placeholder">
							<i>no columns found</i>
						</div>
					}
					<div className="new-column">
						<Button onClick={this.openModalColumn.bind(this, {})}>
							Add column
						</Button>
					</div>
				</div>
				<ModalCardForm
					card={card}
					modalOpen={modalCardOpen}
					closeModal={this.closeModalCard}
					addCard={this.addCard}
					updateCard={this.updateCard}
					removeCard={this.removeCard}
				/>
				<ModalTagForm
					tag={tag}
					modalOpen={modalTagOpen}
					closeModal={this.closeModalTag}
					addTag={this.addTag}
					updateTag={this.updateTag}
					removeTag={this.removeTag}
				/>
				<ModalColumnForm
					column={column}
					modalOpen={modalColumnOpen}
					closeModal={this.closeModalColumn}
					addColumn={this.addColumn}
					updateColumn={this.updateColumn}
					removeColumn={this.removeColumn}
				/>
			</div>
		);
	}
}

export default Board;