import React, { Component } from 'react';
import { Card as SemanticCard, Button, Label, Icon } from 'semantic-ui-react';

import './Card.css';

class Card extends Component {
	getName() {
		const { card: { name }, searchText } = this.props;

		if (!searchText.length) {
			return <span>{name}</span>;
		}

		const index = name.toLowerCase().indexOf(searchText);

		return (
			<span>
				{
					index > 0 &&
					<span>
						{name.slice(0, index)}
					</span>
				}
				<span className="search-selection">
					{name.slice(index, index + searchText.length)}
				</span>
				{
					index + searchText.length < name.length &&
					<span>
						{name.slice(index + searchText.length)}
					</span>
				}
			</span>
		);
	}

	render() {
		const {
			card: { description, tags },
			tagsList,
			editCard,
			archiveCard,
			removeCard,
			moveCard,
			firstColumn,
			lastColumn,
		} = this.props;

		return (
			<SemanticCard>
				<SemanticCard.Content>
					<SemanticCard.Header>
						{this.getName()}
					</SemanticCard.Header>
					<SemanticCard.Meta>
						{description}
					</SemanticCard.Meta>
				</SemanticCard.Content>
				{
					(tags && tags.length) > 0 &&
					<SemanticCard.Content>
						{
							tags.map(tagId => {
								const tag = tagsList.find(({ id }) => id === tagId);

								return (
									<Label
										key={tagId}
										horizontal
										className="card-tag"
										style={{
											background: tag.color,
										}}
									>
										{tag.name}
									</Label>
								);
							})
						}
					</SemanticCard.Content>
				}
				<SemanticCard.Content className="controls" extra>
					<div className='ui three buttons mini'>
						<Button basic color="blue" onClick={editCard}>Edit</Button>
						<Button basic color="grey" onClick={archiveCard}>Archive</Button>
						<Button basic color="red" onClick={removeCard}>Delete</Button>
					</div>
					<div className="move-card">
						<Button.Group size="mini" basic>
							<Button disabled={firstColumn} onClick={moveCard.bind(null, -1)} icon><Icon name="chevron left" /></Button>
							<Button disabled={lastColumn} onClick={moveCard.bind(null, 1)} icon><Icon name="chevron right" /></Button>
						</Button.Group>
					</div>
				</SemanticCard.Content>
			</SemanticCard>
		);
	}
}

export default Card;