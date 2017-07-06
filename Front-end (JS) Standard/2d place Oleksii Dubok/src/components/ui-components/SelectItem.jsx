import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import classnames               from 'classnames/bind';
import styles                   from './SelectItem.less';

const cx = classnames.bind(styles);

class SelectItem extends PureComponent {
    static propTypes = {
        active  : PropTypes.bool.isRequired,
        text    : PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        color   : PropTypes.string
    };

    static defaultProps = {
        color: null
    }

    handleSelect = () => {
        this.props.onSelect();
    };

    render() {
        const { active, text, color } = this.props;
        const itemStyles = cx('SelectItem', {
            active
        });

        return (
            <div
                className={itemStyles}
                onClick={this.handleSelect}
            >
                <div className={styles.color} style={{ background: color }}/>
                <div>{text}</div>
            </div>);
    }
}

export default SelectItem;
