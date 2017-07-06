import React, { Component } from 'react';
import { Modal, Header, Button, Form as SemanticForm } from 'semantic-ui-react';
import { Form, Text } from 'react-form';

class ModalTagForm extends Component {
	render() {
		const { tag, modalOpen, closeModal, addTag, updateTag, removeTag } = this.props;

		return (
			<Modal
				open={modalOpen}
				size="small"
				dimmer="blurring"
				onClose={closeModal.bind(this, null)}
			>
				<Header>
					{
						tag && tag.id ?
						'Edit tag' :
						'Create tag'
					}
				</Header>
				<Modal.Content>
					<Form
						onSubmit={
							tag && tag.id ?
							updateTag :
							addTag
						}
						defaultValues={tag}
						validate={({ name, color }) => {
							const errors = {};

							if (!name) {
								errors.name = 'Required';
							}

							if (!color) {
								errors.color = 'Required';
							}

							return errors;
						}}
					>
						{({ submitForm, getTouched, getError }) => (
							<SemanticForm onSubmit={submitForm}>
								<SemanticForm.Field
									id="form-tag-name"
									control={Text}
									field="name"
									placeholder="What's the name of the tag ?"
									label="Name"
									error={getTouched('name') && !!getError('name')}
								/>
								<SemanticForm.Field
									control={Text}
									field="color"
									label="Color"
									type="color"
								/>
								<Button
									type="button"
									onClick={closeModal.bind(this, null)}
								>
									Cancel
								</Button>
								{
									tag.id &&
									<Button
										type="button"
										onClick={removeTag.bind(this, tag.id)}
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
										tag.id ?
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

export default ModalTagForm;
