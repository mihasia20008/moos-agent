import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

import Item from './Item';

import { statusItems } from '../../contentConstants';

const CheckboxList = ({ activeValue, onChangeItem }) => {
    return (
        <div className={cx('checkbox-list')}>{
            statusItems.map(({ key, text, className }, index) => (
                <Item
                    key={index}
                    onChange={onChangeItem}
                    name="status"
                    value={key}
                    text={text}
                    isChecked={activeValue === key}
                    className={className}
                />
            ))
        }</div>
    );
};

CheckboxList.propTypes = {
    activeValue: PropTypes.string,
    onChangeItem: PropTypes.func.isRequired
};
CheckboxList.defaultProps = {
    activeValue: '',
};

export default CheckboxList;
