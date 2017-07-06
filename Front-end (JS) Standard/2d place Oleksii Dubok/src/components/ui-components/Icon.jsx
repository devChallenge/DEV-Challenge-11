import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import classnames               from 'classnames/bind';
import arrowDown                from '../../assets/icons/dropdown_arrow_down.svg';
import checkOn                  from '../../assets/icons/Check_on.svg';
import checkOff                 from '../../assets/icons/Check_off.svg';
import radioOn                  from '../../assets/icons/Radio_on.svg';
import radioOff                 from '../../assets/icons/Radio_off.svg';
import menu                     from '../../assets/icons/Hamburger.svg';
import btnArrowRight            from '../../assets/icons/button_arrow_right.svg';
import btnArrowLeft             from '../../assets/icons/button_arrow_left.svg';
import btnArrowDown             from '../../assets/icons/button_arrow_down.svg';
import close                    from '../../assets/icons/Close.svg';
import styles                   from './Icon.less';

const ICONS = {
    arrowDown,
    checkOn,
    checkOff,
    radioOn,
    radioOff,
    menu,
    btnArrowRight,
    btnArrowLeft,
    btnArrowDown,
    close
};
const cx = classnames.bind(styles);

class Icon extends PureComponent {
    static propTypes = {
        type          : PropTypes.string.isRequired,
        onClickHandler: PropTypes.func
    };

    static defaultProps = {
        onClickHandler: null
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.type !== this.props.type;
    }

    handleClick = (e) => {
        if (this.props.onClickHandler) {
            this.props.onClickHandler(e);
        }
    };

    render() {
        const { type } = this.props;
        const Svg = ICONS[type];
        const iconStyles = cx('Icon', {
            [type]: type
        });

        return (
            <i className={iconStyles} onClick={this.handleClick}>
                <Svg />
            </i>
        );
    }
}

export default Icon;
