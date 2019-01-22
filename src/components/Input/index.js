import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Input extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onInputChange: PropTypes.func.isRequired,
        defaultValue: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        iconClass: PropTypes.string,
        error: PropTypes.bool,
    };

    static defaultProps = {
        defaultValue: '',
        type: 'text',
        placeholder: '',
    };

    state = {
        value: this.props.defaultValue,
        type: this.props.type,
        hidePlaceholder: false,
    };

    handleShowPassword = () => {
        const { type: stateType } = this.state;
        const { type: propsType } = this.props;

        this.setState({ type: stateType === propsType ? 'text' : propsType });
    };

    handleInputType = ({ target }) => {
        this.setState({ value: target.value });
        const { name, onInputChange } = this.props;
        onInputChange(name, target.value);
    };

    handleInputFocus = () => this.setState({ hidePlaceholder: true });

    handleInputBlur = (event) => {
        if (event.target.value === '') {
            this.setState({ hidePlaceholder: false });
        }
    };

    render() {
        const { value, type: stateType, hidePlaceholder } = this.state;
        const { type: propsTypes, name, placeholder, iconClass, error } = this.props;

        return (
            <div className={cx('form-group__row-input')}>
                {iconClass ? <span className={cx('icon', iconClass)} /> : null}
                {propsTypes === 'password'
                    ? <span className={cx('icon icon-eye')} onClick={this.handleShowPassword} />
                    : null}
                <input
                    id={`input-${name}`}
                    type={stateType}
                    className={cx('form-control', `form-control--${name}`, {
                        'form-control--error': error
                    })}
                    aria-describedby={name}
                    value={value}
                    onChange={this.handleInputType}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                />
                <label
                    className={cx('form-placeholder', {
                        'form-placeholder--hidden': hidePlaceholder
                    })}
                    htmlFor={`#input-${name}`}
                >
                    {placeholder}
                </label>
            </div>
        );
    }
}

export default Input;
