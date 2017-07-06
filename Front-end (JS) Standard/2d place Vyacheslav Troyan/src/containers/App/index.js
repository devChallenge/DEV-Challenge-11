import React from 'react'

import CanbanBoard from './../../components/CanbanBoard/index.js'

// initial data 
const initTickets = [
	{
		id: 'sdf324',
		title: 'first ticket',
		description: 'long text',
		color: '#ff0000',
		rowIndex: 0,
		visibility: true,
	},
	{
		id: 'kk2231',
		title: 'second ticket',
		description: 'long text',
		color: '#ff7700',
		rowIndex: 1,
		visibility: true,
	},
	{
		id: 'kk22asd31',
		title: '3333 ticket',
		description: 'long text',
		color: '#ff7700',
		rowIndex: 1,
		visibility: true,
	},
	{
		id: 'kkqqd31',
		title: '4444 ticket',
		description: 'long text',
		color: '#ff7700',
		rowIndex: 1,
		visibility: true,
	},
]
const initRows = ['To do', 'In progress', 'Done!']

class App extends React.PureComponent {
	render() {
		return (
			<div className="row">

			<CanbanBoard
				initialTickets={initTickets}
				initialRows={initRows}
			/>
			</div>    
		)
	}
}

export default App
