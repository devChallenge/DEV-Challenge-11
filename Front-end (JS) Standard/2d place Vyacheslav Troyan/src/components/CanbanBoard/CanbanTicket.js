import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function CanbanTicket(props) {
	return (
		<div
			className={classNames('dc-ticket', {
				'dc-ticket-hidden': !props.ticket.visibility
			})}
			onDragEnd={props.onDragEnd}
			onClick={props.onTicketEdit}
			style={{ backgroundColor: props.ticket.color }}
			draggable="true"
			data-drag-type={'ticket'}
			data-ticket-id={props.ticket.id}
		>
			{props.ticket.title}
			<br/>
			<span
			className="dc-ticket-description"
				data-drag-type={'ticket'}
				data-ticket-id={props.ticket.id}
			>{props.ticket.description}</span>
		</div>
	)
}

CanbanTicket.propTypes = {
	ticket: PropTypes.object,
	onDragStart: PropTypes.func,
	onDragEnd: PropTypes.func,
	onTicketEdit: PropTypes.func,
}

export default CanbanTicket
