import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const TextField = ({ onChange, value = '' }) => {
    return (
        <div className={cx('main-filter__control')}>
            <input
                type="text"
                className={cx('main-filter__control-field')}
                placeholder="Номер заявки"
                name="orderNumber"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default TextField;
