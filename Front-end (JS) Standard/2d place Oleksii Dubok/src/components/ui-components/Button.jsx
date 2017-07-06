import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import classnames               from 'classnames/bind';
import styles                   from './Button.less';

const cx = classnames.bind(styles);

class Button extends PureComponent {
    static propTypes = {
        onClick : PropTypes.func.isRequired,
        type    : PropTypes.string.isRequired,
        children: PropTypes.any.isRequired,
        width   : PropTypes.number,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        disabled: false,
        width   : null
    }

    render() {
        const { type, width, disabled, children } = this.props;
        const buttonStyles = cx('Button', {
            [type]: type,
            disabled
        });

        return (
            <div
                className={buttonStyles}
                onClick={this.props.onClick}
                style={{ width }}
            >
                {children}
            </div>
        );
    }
}

export default Button;
