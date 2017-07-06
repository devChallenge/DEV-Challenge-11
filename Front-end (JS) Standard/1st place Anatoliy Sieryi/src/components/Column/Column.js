import React, { Component } from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';

import Card from '../Card/Card';
import './Column.css';

class Column extends Component {
	render() {
		const {
			cards,
			tags,
			column: { id, name },
			openModalCard,
			archiveCard,
			removeCard,
			searchText,
			first,
			last,
			moveCard,
			moveColumn,
			editColumn,
		} = this.props;

		return (
			<div className="column">
				<div className="column-header">
					<Header size="large">{name}</Header>
					<div className="controls">
						<Button.Group size="mini" basic>
							{
								!first &&
								<Button icon onClick={moveColumn.bind(null, -1)}>
									<Icon name="chevron left" />
								</Button>
							}
							<Button onClick={editColumn}>
								Edit
							</Button>
							{
								!last &&
								<Button icon onClick={moveColumn.bind(null, 1)}>
									<Icon name="chevron right" />
								</Button>
							}
						</Button.Group>
					</div>
				</div>
				<div className="cards">
					{
						cards.length ?
						cards.map(card => (
							<Card
								key={card.id}
								card={card}
								tagsList={tags}
								searchText={searchText}
								editCard={openModalCard.bind(this, card)}
								archiveCard={archiveCard.bind(this, card.id)}
								removeCard={removeCard.bind(this, card.id)}
								moveCard={moveCard.bind(this, card.id)}
								firstColumn={first}
								lastColumn={last}
							/>
						)) :
						<div className="no-data-placeholder">
							<i>no cards found</i>
						</div>
					}
					{
						first &&
						<div>
							<Button fluid size="mini" onClick={openModalCard.bind(this, {
								column: id,
							})}>
								Add card
							</Button>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default Column;