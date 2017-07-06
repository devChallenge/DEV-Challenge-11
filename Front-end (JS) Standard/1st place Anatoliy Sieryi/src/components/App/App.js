import React, { Component } from 'react';

import { getStatus, seedData } from '../../services/seedService';

import Board from '../Board/Board';
import './App.css';

class App extends Component {
	constructor() {
		super();

		const initialized = getStatus();

		if (!initialized) {
			seedData();
		}
	}

	render() {
		return (
			<div className="app">
				<Board />
			</div>
		);
	}
}

export default App;