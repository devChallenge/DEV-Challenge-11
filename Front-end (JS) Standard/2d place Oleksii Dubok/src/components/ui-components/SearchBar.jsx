import React, { PureComponent } from 'react';
import PropTypes             from 'prop-types';
import TextField                from '../ui-components/TextField.jsx';
import styles                   from './SearchBar.less';

class SearchBar extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    }

    handleSearch = (name, value) => this.props.onChange(value)

    render() {
        return (
            <div className={styles.SearchBar}>
                <TextField
                    name='searchQuery'
                    label='Search'
                    onChange={this.handleSearch}
                />
            </div>
        );
    }
}

export default SearchBar;
