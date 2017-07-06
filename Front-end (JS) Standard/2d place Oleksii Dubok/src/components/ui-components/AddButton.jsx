import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AddButton.less';

class AddButton extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={styles.AddButton} onClick={this.props.onClick}>
                +
            </div>
        );
    }
}


export default AddButton;
