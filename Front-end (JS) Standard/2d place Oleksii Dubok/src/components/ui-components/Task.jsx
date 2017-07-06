import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Task.less';

class Task extends PureComponent {
    static propTypes = {
        task    : PropTypes.object.isRequired,
        onEdit  : PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    };


    render() {
        const { task } = this.props;

        return (
            <div className={styles.Task}>
                <div className={styles.color} style={{ background: task.color }}/>
                <div className={styles.content}>
                    <div className={styles.name}>{task.name}</div>
                    <div className={styles.description}>{task.description}</div>
                    <div className={styles.status}>status: {task.status}</div>
                </div>
                <div className={styles.controls}>
                    <button onClick={this.props.onEdit.bind(this, task)}>Edit</button>
                    <button onClick={this.props.onDelete.bind(this, task)}>Delete</button>
                </div>
            </div>
        );
    }
}

export default Task;
