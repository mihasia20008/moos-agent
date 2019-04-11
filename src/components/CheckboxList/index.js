import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

import Item from './Item';

import CONTENT from '../../contentConstants';

const CheckboxList = ({ activeValue, onChangeItem }) => {
    const { statusItems } = CONTENT;
    return (
        <div className={cx('checkbox-list')}>
            {statusItems.map(({ key, text, className }, index) => {
                if (key === 'total') {
                    return null;
                }
                return (
                    <Item
                        key={index}
                        onChange={onChangeItem}
                        name="status"
                        value={key}
                        text={text}
                        isChecked={activeValue === key}
                        className={className}
                    />
                );
            })}
            <Item
                key={statusItems.length}
                onChange={onChangeItem}
                name="status"
                value="all"
                title="Все"
                text={(
                    <span className={cx('icon icon-dots')}>
                      <span className={cx('dot')} />
                      <span className={cx('dot')} />
                      <span className={cx('dot')} />
                    </span>
                )}
                className="white"
            />
        </div>
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
