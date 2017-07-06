import { combineReducers } from 'redux';
import columns             from './columns-reducer';
import categories          from './categories-reducer';
import tasks               from './tasks-reducer';
import view                from './view-reducer';
import archive             from './archive-reducer';

export default combineReducers({
    view,
    columns,
    categories,
    tasks,
    archive
});
