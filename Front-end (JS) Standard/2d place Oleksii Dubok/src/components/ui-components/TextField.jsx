import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import debounce                 from 'lodash.debounce';
import classnames               from 'classnames/bind';
import styles                   from './TextField.less';

const cx = classnames.bind(styles);

class TextField extends PureComponent {
    static propTypes = {
        name        : PropTypes.string.isRequired,
        onChange    : PropTypes.func.isRequired,
        label       : PropTypes.string,
        defaultValue: PropTypes.string,
        type        : PropTypes.string,
        errorText   : PropTypes.string,
        style       : PropTypes.object,
        valid       : PropTypes.bool,
        multiline   : PropTypes.bool
    };

    static defaultProps = {
        style       : {},
        valid       : true,
        multiline   : false,
        errorText   : '',
        label       : '',
        defaultValue: '',
        type        : 'text'
    }

    state = {
        active: false
    };

    handleFocus = () => this.setState({ active: true });

    handleBlur = () => this.setState({ active: false });

    handleChange = (e) => this.delayedChange(e.target.id, e.target.value);

    delayedChange = debounce((name, val) => this.props.onChange(name, val), 100);


    render() {
        const { defaultValue, label, name, type,
            errorText, style, valid, multiline } = this.props;
        const { active } = this.state;
        const textClass = cx('TextField', {
            invalid: !valid,
            multiline,
            active
        });

        return (
            <div
                className={textClass}
                style={style}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                {
                   multiline
                        ? <textarea
                            id={name}
                            className={styles.textArea}
                            defaultValue={defaultValue}
                            onChange={this.handleChange}
                          />
                        : <input
                            id={name}
                            type={type}
                            className={styles.inputText}
                            defaultValue={defaultValue}
                            onChange={this.handleChange}
                          />
               }
                <label className={styles.label} htmlFor={name}>
                    {valid ? label : errorText}
                </label>
                <div className={styles.underline}>
                    <div />
                </div>
            </div>
        );
    }
}

export default TextField;
