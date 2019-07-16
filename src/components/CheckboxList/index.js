import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

import Item from './Item';

const CheckboxList = ({ activeValue, onChangeItem, statusItems }) => {
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
    onChangeItem: PropTypes.func.isRequired,
    statusItems: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        className: PropTypes.string
    })),
};
CheckboxList.defaultProps = {
    activeValue: '',
    statusItems: []
};

export default CheckboxList;
