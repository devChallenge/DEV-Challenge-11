import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import AddButton            from '../ui-components/AddButton.jsx';
import EditorPanel          from '../ui-components/EditorPanel.jsx';
import Task                 from '../ui-components/Task.jsx';
import styles               from './Board.less';

class Board extends Component {
    static propTypes = {
        deleteTask      : PropTypes.func.isRequired,
        editTask        : PropTypes.func.isRequired,
        tasks           : PropTypes.array.isRequired,
        columns         : PropTypes.array.isRequired,
        setEditingStatus: PropTypes.func.isRequired,
        editingStatus   : PropTypes.string.isRequired
    };

    handleAddTask = () => this.props.setEditingStatus('task');

    handleEditTask = (task) => {
        this.props.setEditingStatus('task');
        this.props.editTask(task);
    };

    handleDeleteTask = (task) => this.props.deleteTask(task);

    renderTasks = (tasks) => tasks.map(t =>
        <Task
            key={t.id}
            task={t}
            onEdit={this.handleEditTask}
            onDelete={this.handleDeleteTask}
        />);

    render() {
        const { columns, editingStatus, setEditingStatus, tasks } = this.props;
        const board = columns.map((col) => {
            return (
                <div className={styles.column} key={col.id}>
                    <div className={styles.header}>
                        {col.name}
                    </div>
                    <div className={styles.tasks}>
                        {this.renderTasks(tasks.filter(t => t.status === col.name))}
                    </div>
                </div>
            );
        });

        return (
            <div className={styles.Board}>
                {board}
                <AddButton onClick={this.handleAddTask} />
                <EditorPanel

                    editingStatus={editingStatus}
                    setEditingStatus={setEditingStatus}
                />
            </div>
        );
    }
}

export default Board;
