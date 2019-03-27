import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

import { formatNumber } from '../../../../../services/utility';

const StatItem = ({ text, amount, count, sum, progressColor }) => {
    const barWidth = `${((count / sum) * 100).toFixed(1)}%`;

    const difference = (val, by) => {
        return (val - val % by) / by;
    };

    const getTextPrice = (price) => {
        const thousandRemainder = difference(price, 1000);
        if (!thousandRemainder) {
            return price;
        }
        const millionRemainder = difference(thousandRemainder, 1000);
        if (!millionRemainder) {
            return `${thousandRemainder}К`;
        }
        return `${formatNumber(millionRemainder, false)}М`;
    };

    return (
        <div
            className={cx('fr-agent-card__footer-item', {
                [`fr-agent-card__footer-item--${progressColor}`]: progressColor
            })}
            style={{ width: barWidth }}
            title={text}
        >
            <div className={cx('fr-agent-card__footer-item-counter')}>
                <span className={cx('icon icon-ok')} />
                <span className={cx('fr-agent-card__footer-item-counter-value')}>
                    {formatNumber(count, false)}
                </span>
            </div>
            <div className={cx('fr-agent-card__footer-item-cost')}>
                <span>{`${getTextPrice(amount)} ₽`}</span>
            </div>
        </div>
    );
};

StatItem.propTypes = {
    text: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
    progressColor: PropTypes.string.isRequired,
};

export default StatItem;
