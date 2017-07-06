import React, { Component } from 'react';
import { Modal, Header, Button, Form as SemanticForm } from 'semantic-ui-react';
import { Form, Text } from 'react-form';

class ModalColumnForm extends Component {
	render() {
		const { column, modalOpen, closeModal, addColumn, updateColumn, removeColumn } = this.props;

		return (
			<Modal
				open={modalOpen}
				size="small"
				dimmer="blurring"
				onClose={closeModal.bind(this, null)}
			>
				<Header>
					{
						column && column.id ?
						'Edit column' :
						'Create column'
					}
				</Header>
				<Modal.Content>
					<Form
						onSubmit={
							column && column.id ?
							updateColumn :
							addColumn
						}
						defaultValues={column}
						validate={({ name }) => {
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
									id="form-column-name"
									control={Text}
									field="name"
									placeholder="What's the name of the column ?"
									label="Name"
									error={getTouched('name') && !!getError('name')}
								/>
								<Button
									type="button"
									onClick={closeModal.bind(this, null)}
								>
									Cancel
								</Button>
								{
									column.id &&
									<Button
										type="button"
										onClick={removeColumn.bind(this, column.id)}
										negative
										floated="right"
									>
										Delete
									</Button>
								}
								<Button
									type="submit"
									primary
									floated="right"
								>
									{
										column.id ?
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

export default ModalColumnForm;
