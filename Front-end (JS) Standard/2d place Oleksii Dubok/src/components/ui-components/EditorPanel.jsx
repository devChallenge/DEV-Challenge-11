import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { CSSTransitionGroup }   from 'react-transition-group';
import Modal                    from 'react-modal';
import TaskForm                 from './TaskForm.jsx';
import ColumnForm               from './ColumnForm.jsx';
import styles                   from './EditorPanel.less';


class EditorPanel extends PureComponent {
    static propTypes = {
        editingStatus   : PropTypes.string,
        task            : PropTypes.object,
        setEditingStatus: PropTypes.func.isRequired
    };

    static defaultProps = {
        editingStatus: ''
    }

    handleClosePane = () => {
        this.props.setEditingStatus('');
    }

    render() {
        const { editingStatus, task } = this.props;

        return (
            <Modal
                isOpen={!!editingStatus}
                contentLabel='Image picker Modal'
                onRequestClose={this.handleClosePane}
                className='Modal'
                overlayClassName='Overlay'
                closeTimeoutMS={400}
            >
                <CSSTransitionGroup
                    transitionName={{
                        enter       : styles.galleryEnter,
                        enterActive : styles.galleryEnterActive,
                        leave       : styles.galleryLeave,
                        leaveActive : styles.galleryLeaveActive,
                        appear      : styles.galleryEnter,
                        appearActive: styles.galleryEnterActive
                    }}
                    component={FirstChild}
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}
                    transitionAppearTimeout={400}
                    transitionAppear
                >
                    {editingStatus
                            ? <div className={styles.EditorPanel}>
                                {
                                    editingStatus === 'task'
                                    ? <TaskForm onCancel={this.handleClosePane} task={task} />
                                        : null
                                }
                                {
                                    editingStatus === 'column'
                                    ? <ColumnForm onCancel={this.handleClosePane} />
                                        : null
                                }
                            </div>
                            : null}
                </CSSTransitionGroup>
            </Modal>
        );
    }
}

function FirstChild(props) {
    const childrenArray = React.Children.toArray(props.children);

    return childrenArray[0] || null;
}

export default EditorPanel;
