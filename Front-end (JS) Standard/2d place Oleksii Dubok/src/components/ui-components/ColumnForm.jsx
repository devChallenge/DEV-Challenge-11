import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '../ui-components/TextField.jsx';
import Button from '../ui-components/Button.jsx';
import { createColumn } from '../../actions/columns.js';
import styles from './Taskform.less';

class ColumnForm extends PureComponent {
    static propTypes = {
        columns     : PropTypes.array.isRequired,
        onCancel    : PropTypes.func.isRequired,
        createColumn: PropTypes.func.isRequired
    };

    state = {
        name: ''
    }

    handleInputChange = (key, value) => {
        this.setState({ [key]: value });
    }

    handleSaveTask = () => {
        this.props.createColumn(this.state);

        this.props.onCancel();
    };

    handleCancel = () => this.props.onCancel();

    render() {
        const { name } = this.state;

        return (
            <div className={styles.TaskForm}>
                <TextField
                    name='name'
                    label='Name'
                    defaultValue={name}
                    onChange={this.handleInputChange}
                />

                <div className={styles.footer}>
                    <Button
                        onClick={this.props.onCancel}
                        type='gray'
                    >Cancel</Button>
                    <Button
                        onClick={this.handleSaveTask}
                        type='green'
                    >Save</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    columns: state.columns
});


export default connect(mapStateToProps, { createColumn })(ColumnForm);
