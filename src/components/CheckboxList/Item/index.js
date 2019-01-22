import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

const Item = ({ name, value, text, isChecked, className, onChange }) => {
    return (
        <div className={cx('checkbox-list__item', {
            [`checkbox-list__item--${className}`]: className
        })}>
            <input
                type="radio"
                name={name}
                value={value}
                id={value}
                checked={isChecked}
                onChange={onChange}
            />
            <label htmlFor={value}>{text}</label>
        </div>
    );
};

Item.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

Item.defaultProps = {
    value: '',
    text: '-//-',
    className: '',
};

export default Item;
