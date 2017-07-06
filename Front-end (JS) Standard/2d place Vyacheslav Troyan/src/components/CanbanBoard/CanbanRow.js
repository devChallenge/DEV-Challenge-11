import React from 'react'
import PropTypes from 'prop-types'

import CanbanTicket from './CanbanTicket'

export default class CanbanRow extends React.PureComponent {
	static propTypes = {
		row: PropTypes.string.isRequired,
		onDragEnd: PropTypes.func,
		onTicketEdit: PropTypes.func,
	}

	render() {
		const { row, index, width, tickets, onDragEnd, onTicketEdit } = this.props

		return (
			<div className="dc-row" data-drag-type={'row'} data-row-index={index} style={{ width }}>
				<span className="dc-row-title">{row}</span>

				{tickets.map((ticket, index) => (
					<div key={ticket.id}>
						{CanbanTicket({
							ticket,
							onDragEnd,
							onTicketEdit,
						})}
					</div>
				))}
			</div>
		)
	}
}
