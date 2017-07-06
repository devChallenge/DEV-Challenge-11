import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Route }                from 'react-router-dom';
import Header                   from '../ui-components/Header.jsx';
import BoardContainer           from '../../containers/Board-container.jsx';
import styles                   from './Layout.less';


class Layout extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired
    }

    state = {
        forwardTransition: true
    }


    render() {
        return (
            <div className={styles.Layout}>
                <Route path='/' component={Header} />
                <Route path='/' component={BoardContainer} />
            </div>
        );
    }
}


export default Layout;
