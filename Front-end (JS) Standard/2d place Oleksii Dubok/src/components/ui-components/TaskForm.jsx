import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import { connect }                from 'react-redux';
import SelectCategory             from '../../containers/SelectCategory.jsx';
import SelectStatus               from '../../containers/SelectStatus.jsx';
import TextField                  from '../ui-components/TextField.jsx';
import Button                     from '../ui-components/Button.jsx';
import { createTask, updateTask } from '../../actions/task.js';
import styles                     from './Taskform.less';

class TaskForm extends PureComponent {
    static propTypes = {
        task      : PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired,
        onCancel  : PropTypes.func.isRequired,
        createTask: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired
    };

    state = {
        name       : this.props.task.name,
        description: this.props.task.description,
        status     : this.props.task.status,
        category   : this.props.categories[0].id,
        color      : this.props.categories[0].color
    }

    handleInputChange = (key, value) => {
        this.setState({ [key]: value });
    }

    handleSaveTask = () => {
        const { task } = this.props;

        if (task.id) {
            this.props.updateTask(task.id, this.state);
        } else {
            this.props.createTask(this.state);
        }
        this.props.onCancel();
    };

    handleCancel = () => this.props.onCancel();

    render() {
        const { name, description, category, status } = this.state;

        return (
            <div className={styles.TaskForm}>
                <TextField
                    name='name'
                    label='Name'
                    defaultValue={name}
                    onChange={this.handleInputChange}
                />
                <TextField
                    name='description'
                    label='Description'
                    defaultValue={description}
                    onChange={this.handleInputChange}
                    height={100}
                    multiline
                />
                <SelectCategory
                    onCategorySelect={this.handleInputChange}
                    selected={category}
                />
                <SelectStatus
                    onStatusSelect={this.handleInputChange}
                    selected={status}
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
    categories: state.categories,
    task      : state.view.editingTask
});


export default connect(mapStateToProps, { createTask, updateTask })(TaskForm);
