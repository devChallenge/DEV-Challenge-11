import React from 'react'
import PropTypes from 'prop-types'

export default class CanbanRow extends React.PureComponent {
	static propTypes = {
		searchValue: PropTypes.string.isRequired,
		onSearchUpdate: PropTypes.func.isRequired,
	}

	render() {
		const { onSearchUpdate, searchValue } = this.props

		return (
			<div className="dc-search">
				<input type="text" value={searchValue} placeholder="Search by name" onChange={onSearchUpdate} />
			</div>
		)
	}
}