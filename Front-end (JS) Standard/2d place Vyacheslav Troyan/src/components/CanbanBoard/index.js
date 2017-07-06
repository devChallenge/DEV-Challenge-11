import React from 'react'
import PropTypes from 'prop-types'

import CanbanRow from './CanbanRow'
import CanbanSearch from './CanbanSearch'
import CanbanPopup from './CanbanPopup'
import CanbanTrash from './CanbanTrash'

// utils
import removeFromArrayById from './../../utils/removeFromArrayById'
import findIndexById from './../../utils/findIndexById'

import styles from './styles.css' //eslint-disable-line

export default class CanbanBoard extends React.PureComponent {
	static propTypes = {
		initialTickets: PropTypes.array.isRequired,
		initialRows: PropTypes.array.isRequired,
	}

	state = {
		tickets: [],
		rows: [],
		searchValue: '',
		showPopup: false,
	}

	constructor(props) {
		super(props)

		this.onSearchUpdate = this.onSearchUpdate.bind(this)
		this.onDragEnd = this.onDragEnd.bind(this)
	}

	componentWillMount = () => {
		this.loadInitialTickets()
		this.loadInitialRows()
	}

	componentWillUpdate = (nextProps, nextState) => {
		const { searchValue } = this.state

		// пошук по тікетах
		if (searchValue !== nextState.searchValue) {
			this.highlightTickets(nextState.searchValue)
		}
	}

	// виділити таски, які відповідають критеріям пошуку
	highlightTickets = (searchValue) => {
		const { tickets } = this.state
		const newTickets = tickets.concat([])

		newTickets.forEach(item => {
			if (searchValue === '') {
				item.visibility = true
			} else {
				item.visibility = !!(item.title.search(searchValue) + 1)
			}
		})

		this.setState({ tickets: newTickets })
	}

	// видалити таск по id
	removeTicket = (id) => {
		const { tickets } = this.state
		const updatedTickets = removeFromArrayById(tickets, id)

		this.setState({ tickets: updatedTickets })
	}
	
	// завантажити тікети при підключенні компоненту в локальне хранилище
	loadInitialTickets = () => {
		const { initialTickets } = this.props

		if(initialTickets) this.setState({ tickets: initialTickets })
	}

	// завантажити початкові рядки при ініціалізації компонента
	loadInitialRows = () => {
		const { initialRows } = this.props

		if(initialRows) this.setState({ rows: initialRows })
	}

	// отримати всі таски, які є в рядку по індексу рядка
	filterTicketsByRow = (rowIndex) => {
		const { tickets } = this.state

		return tickets.filter(item => String(item.rowIndex) === String(rowIndex))
	}
	
	// обновити позиції тасків
	replaceTickets = (start, end) => {
		const type = end.getAttribute('data-drag-type')
		const startTicket = this.findTicketById(start.getAttribute('data-ticket-id'))

		switch (type) {
		// якщо таск був наведений на пусту область в рядку, 
		// тоді поміняти rowIndex і сам таск перемістити в кінець массива з тасками
		case 'row': {
			this.moveTicketToEndRow(startTicket, end)
			break
		}

		// якщо таск був наведений на інший таск, 
		// тоді поміняти rowIndex такий як в останнього таска і перемістити за ним
		case 'ticket': {
			this.moveTicketAfterTicket(startTicket, end)
			break
		}
		case 'trash': {
			this.removeTicket(startTicket.id)
			break
		}
		default: {
			// наведено за дошку або на елемент, який не є draggable
			return false
		}
		}
	}

	// добавити таск в кінець рядка
	moveTicketToEndRow = (startTicket, endTicket) => {
		const { tickets } = this.state

		const newRowIndex = endTicket.getAttribute('data-row-index')
		startTicket.rowIndex = newRowIndex
		const newTickets = removeFromArrayById(tickets, startTicket.id)
		
		this.setState({ tickets: newTickets.concat([startTicket]) })
	}
	
	// поміняти тікети місцями і оновити rowIndex
	moveTicketAfterTicket = (startTicket, end) => {
		const { tickets } = this.state
		const endTicket = this.findTicketById(end.getAttribute('data-ticket-id'))
		const newRowIndex = endTicket.rowIndex
		const newTickets = removeFromArrayById(tickets, startTicket.id)
		// оновити індекс
		startTicket.rowIndex = newRowIndex
		// помістити таск після кінечного таску
		const index = findIndexById(newTickets, endTicket.id)
		newTickets.splice(index, 0, startTicket)
		
		this.setState({ tickets: newTickets })
	}

	findTicketById = (id) => {
		const { tickets } = this.state

		return tickets.find(item => item.id === id)
	}

	// ***************************************
	// методи для роботи з попапом
	// ***************************************

	// переключити вигляд попапу для додавання тасків
	togglePopup = () => {
		const { showPopup } = this.state

		this.setState({ showPopup: !showPopup })	
	}

	// ***************************************
	// Обробиники івентів
	// ***************************************

	// поміняти текст пошуку
	onSearchUpdate = (e) => {
		this.setState({ searchValue: e.target.value })
	}

	// закінчення драг енд дроп - оновити позиції тасків відповідно до координат елементу,
	// на якому зупинились
	onDragEnd = (e) => {
		const endTarget = document.elementsFromPoint(e.clientX, e.clientY)[0]
		
		this.replaceTickets(e.target, endTarget)
	}

	// редагувати таск
	onTicketEdit = (e) => {
		const editTaskId = e.target.getAttribute('data-ticket-id')

		console.log('Edit task with id - ', editTaskId)
	} 

	// добавити таск в кінець всіх тасків.
	// Використовується для добавленння айтема в попапі60
	onAddTicket = (data) => {
		const { tickets } = this.state

		this.setState({ tickets: tickets.concat([data]) })
	}

	render() {
		const { rows, searchValue, showPopup } = this.state

		return (
			<div className="dc-board">
				<CanbanSearch
					searchValue={searchValue}
					onSearchUpdate={this.onSearchUpdate}
				/>

				<CanbanPopup
					onAddTicket={this.onAddTicket}
					togglePopup={this.togglePopup}
					showPopup={showPopup}
				/>

				{rows.map((item, index) => (
					<CanbanRow
						row={item}
						index={index}
						tickets={this.filterTicketsByRow(index)}
						width={`${100 / rows.length}%`}
						onDragEnd={this.onDragEnd}
						onTicketEdit={this.onTicketEdit}
						key={index}
					/>
				))}

				{CanbanTrash({
					removeTicket: this.removeTicket
				})}
				
			</div>
		)
	}
}