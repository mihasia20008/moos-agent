import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

const Item = ({ name, value, title, text, isChecked, className, onChange }) => {
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
            <label htmlFor={value} title={title || text}>{text}</label>
        </div>
    );
};

Item.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.node,
    className: PropTypes.string,
    isChecked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

Item.defaultProps = {
    value: '',
    title: '',
    text: '-//-',
    className: '',
    isChecked: false
};

export default Item;
