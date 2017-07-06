import React from 'react'
import PropTypes from 'prop-types'

// utils
import guid from './../../utils/guid'

export default class CanbanPopup extends React.PureComponent {
	static propTypes = {
		onAddTicket: PropTypes.func.isRequired,
		togglePopup: PropTypes.func.isRequired,
		showPopup: PropTypes.bool.isRequired,
		initData: PropTypes.object,
	}

	constructor(props) {
		super(props)

		this.onInputChange = this.onInputChange.bind(this)
		this.addTask = this.addTask.bind(this)
	}

	state = {
		title: '',
		description: '',
		rowIndex: 0,
		color: '#cccccc',
	}

	// змінити значення інпута і зберегти в внутрішньому стейті
	onInputChange = (e) => {
		const name = e.target.getAttribute('data-state-name')

		this.setState({ [name]: e.target.value })
	}

	// підготувати таск і передати його батьківському компоненту щоб він його добавив з загальний стейт
	addTask = () => {
		const { onAddTicket, togglePopup } = this.props
		const { title, description, rowIndex, color } = this.state
		const id = guid()

		onAddTicket({
			id,
			title,
			description,
			rowIndex,
			color,
			visibility: true,
		})
		togglePopup()
	}

	render() {
		const { togglePopup, showPopup } = this.props
		const { title, description, rowIndex, color } = this.state

		return (
			<div className="dc-add-ticket">
				<button onClick={togglePopup} className="dc-btn dc-add-ticket-btn">Add ticket</button>

				{showPopup && (
					<div className="dc-popup-wrap">
						<div className="dc-popup">
							<h2>Add ticket</h2>

							<button onClick={togglePopup} className="dc-close-btn">close</button>

							<div>
								<label htmlFor="dc-title">Title</label>
								<input onChange={this.onInputChange} placeholder="Title" value={title} data-state-name={'title'} id="dc-title" />
							</div>

							<div>
								<label htmlFor="dc-description">Description</label>
								<input onChange={this.onInputChange} placeholder="Description" value={description} data-state-name={'description'} id="dc-description" />
							</div>

							<div>
								<label htmlFor="dc-color">Color</label>
								<input onChange={this.onInputChange} type="color" placeholder="Color" value={color} data-state-name={'color'} id="cd-color" />
							</div>
						
							<div>
								<label htmlFor="dc-row">Row index(starts from 0)</label>
								<input onChange={this.onInputChange} min="0" type="number" placeholder="Row index" value={rowIndex} data-state-name={'rowIndex'} id="row" />
							</div>

							<button className="dc-btn dc-add-task" onClick={this.addTask}>Add ticket</button>
						</div>

					</div>
				)}
				
			</div>
		)
	}
}