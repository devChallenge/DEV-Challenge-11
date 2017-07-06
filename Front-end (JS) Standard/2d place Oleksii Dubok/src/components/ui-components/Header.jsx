import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import { searchByName, setEditingStatus }         from '../../actions/view.js';
import SearchBar                from './SearchBar.jsx';
import styles                   from './Header.less';

class Header extends PureComponent {
    static propTypes = {
        searchByName    : PropTypes.func.isRequired,
        location        : PropTypes.object.isRequired,
        history         : PropTypes.object.isRequired,
        setEditingStatus: PropTypes.func.isRequired
    };

    handleSearch = (query) => this.props.searchByName(query);

    handleAddColumn = () => this.props.setEditingStatus('column');

    render() {
        return (
            <div className={styles.Header}>
                <div className={styles.menu}>
                    KANBAN BOARD
                </div>
                <SearchBar onChange={this.handleSearch} />
                <button onClick={this.handleAddColumn}>Add column</button>
                <div className={styles.version}>
                    Version: {process.env.VERSION}
                </div>
            </div>
        );
    }
}

export default connect(null, { searchByName, setEditingStatus })(Header);
