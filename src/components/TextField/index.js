import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ClearButton from '../ClearButton';

class TextField extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string,
    };

    static defaultProps = { value: '' };

    handleClearField = () => {
        const { name, onClear } = this.props;
        onClear(name, '');
    };

    render() {
        const { name, onChange, value, placeholder } = this.props;

        return (
            <div className={cx('main-filter__control')}>
                <input
                    type="text"
                    className={cx('main-filter__control-field')}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <ClearButton
                    onClear={this.handleClearField}
                    isHidden={!value.length}
                />
            </div>
        );
    }
}

export default TextField;
