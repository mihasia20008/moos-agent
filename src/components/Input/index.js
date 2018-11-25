import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Input extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onInputBlur: PropTypes.func.isRequired,
        defaultValue: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        iconClass: PropTypes.string,
    };

    static defaultProps = {
        defaultValue: '',
        type: 'text',
        placeholder: '',
    };

    state = {
        value: this.props.defaultValue,
        type: this.props.type,
    };

    handleShowPassword = () => {
        const { type: stateType } = this.state;
        const { type: propsType } = this.props;

        this.setState({ type: stateType === propsType ? 'text' : propsType });
    }

    handleInputType = ({ target }) => this.setState({ value: target.value });

    handleInputBlur = () => {
        const { name, onInputBlur } = this.props;
        const { value } = this.state;

        onInputBlur(name, value);
    }

    render() {
        const { value, type: stateType } = this.state;
        const { type: propsTypes, name, placeholder, iconClass } = this.props;

        return (
            <div className={cx('form-group__row-input')}>
                {iconClass ? <span className={cx('icon', iconClass)} /> : null}
                {propsTypes === 'password'
                    ? <span className={cx('icon icon-eye')} onClick={this.handleShowPassword} />
                    : null}
                <input 
                    type={stateType}
                    className={cx('form-control', `form-control--${name}`)}
                    aria-describedby={name} 
                    placeholder={placeholder}
                    value={value}
                    onChange={this.handleInputType}
                    onBlur={this.handleInputBlur}
                />
            </div>
        );
    }
}

export default Input;
