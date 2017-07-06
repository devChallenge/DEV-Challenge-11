import React, { Component } from 'react';
import { Modal, Header, Button, Form as SemanticForm } from 'semantic-ui-react';
import { Form, Text } from 'react-form';

class ModalCardForm extends Component {
	render() {
		const { card, modalOpen, closeModal, addCard, updateCard,
			removeCard } = this.props;

		return (
			<Modal
				open={modalOpen}
				size="small"
				dimmer="blurring"
				onClose={closeModal.bind(this, null)}
			>
				<Header>
					{
						card && card.id ?
						'Edit card' :
						'Create card'
					}
				</Header>
				<Modal.Content>
					<Form
						onSubmit={
							card && card.id ?
							updateCard :
							addCard
						}
						defaultValues={card}
						validate={({ name, description }) => {
							const errors = {};

							if (!name) {
								errors.name = 'Required';
							}

							return errors;
						}}
					>
						{({ submitForm, getTouched, getError }) => (
							<SemanticForm onSubmit={submitForm}>
								<SemanticForm.Field
									id="form-card-name"
									control={Text}
									field="name"
									placeholder="What's the name of the card ?"
									label="Name"
									error={getTouched('name') && !!getError('name')}
								/>
								<SemanticForm.Field
									control={Text}
									field="description"
									placeholder="Add description here"
									label="Description"
								/>
								<Button
									type="button"
									onClick={closeModal.bind(this, null)}
								>
									Cancel
								</Button>
								{
									card.id &&
									<Button
										type="button"
										onClick={removeCard.bind(this, card.id)}
										negative
										floated="right"
									>
										Delete
									</Button>
								}
								<Button
									type="submit"
									floated="right"
								>
									{
										card.archived ?
										'Restore' :
										'Archive'
									}
								</Button>
								<Button
									type="submit"
									primary
									floated="right"
								>
									{
										card.id ?
										'Update' :
										'Create'
									}
								</Button>
							</SemanticForm>
						)}
					</Form>
				</Modal.Content>
			</Modal>
		);
	}
}

export default ModalCardForm;
