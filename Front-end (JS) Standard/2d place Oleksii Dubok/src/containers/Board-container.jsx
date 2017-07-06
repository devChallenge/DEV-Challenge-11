import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import { setEditingStatus, editTask } from '../actions/view.js';
import { deleteTask } from '../actions/task.js';
import Board                    from '../components/pages/Board.jsx';

class BoardContainer extends PureComponent {
    static propTypes = {
        query           : PropTypes.string.isRequired,
        tasks           : PropTypes.array.isRequired,
        columns         : PropTypes.array.isRequired,
        setEditingStatus: PropTypes.func.isRequired,
        editingStatus   : PropTypes.string.isRequired,
        deleteTask      : PropTypes.func.isRequired,
        editTask        : PropTypes.func.isRequired
    };

    render() {
        const { tasks, columns, editingStatus, query } = this.props;

        return (
            <Board
                columns={columns}
                tasks={query ? tasks.filter(t => t.name.indexOf(query) !== -1) : tasks}
                editingStatus={editingStatus}
                editTask={this.props.editTask}
                deleteTask={this.props.deleteTask}
                setEditingStatus={this.props.setEditingStatus}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    query        : state.view.searchQuery,
    columns      : state.columns,
    tasks        : state.tasks,
    editingStatus: state.view.editingStatus
});

export default connect(mapStateToProps, { setEditingStatus, editTask, deleteTask })(BoardContainer);
