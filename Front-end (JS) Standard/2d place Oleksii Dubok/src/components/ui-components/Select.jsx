import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import classnames               from 'classnames/bind';
import Icon                     from './Icon.jsx';
import styles                   from './Select.less';

const cx = classnames.bind(styles);

class Select extends PureComponent {
    static propTypes = {
        label        : PropTypes.string.isRequired,
        maxHeight    : PropTypes.number,
        selected     : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        color        : PropTypes.string,
        width        : PropTypes.number,
        children     : PropTypes.array,
        dropdownWidth: PropTypes.number
    };

    static defaultProps = {
        maxHeight    : null,
        width        : null,
        selected     : null,
        children     : [],
        color        : null,
        dropdownWidth: null
    }

    state = {
        isOpen: false
    }

    componentDidMount() {
        document.querySelector('body').addEventListener('mouseup', this.handleBodyClick);
    }

    componentWillUnmount() {
        document.querySelector('body').removeEventListener('mouseup', this.handleBodyClick);
    }

    handleBodyClick = e => {
        const targetNode = e.target.innerHTML;
        const isNotChild = this.menu && !this.menu.innerHTML.includes(targetNode);

        if (isNotChild && this.state.isOpen) this.handleToggleMenu();
    }

    handleToggleMenu = () => {
        const { isOpen } = this.state;

        this.setState({ isOpen: !isOpen });
    }

    render() {
        const { selected, maxHeight, label, children, dropdownWidth, width, color } = this.props;
        const { isOpen } = this.state;
        const selectStyles = cx('Select', {
            isOpen
        });

        return (
            <div
                className={selectStyles}
                onClick={this.handleToggleMenu}
                ref={c => this.menu = c}
            >
                <div className={styles.label}>{label}</div>
                <div className={styles.selected} style={{ width }}>
                    <div className={styles.text}>
                        {color
                            ? <div className={styles.color} style={{ background: color }}/>
                            : null}
                        {selected}
                    </div>
                    <Icon type='arrowDown' />
                </div>
                <div
                    className={styles.dropdown} style={{
                        maxHeight: isOpen ? maxHeight : 0,
                        width    : dropdownWidth
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default Select;
