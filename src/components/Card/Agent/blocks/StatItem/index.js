import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

import { formatNumber } from '../../../../../services/utility';

const StatItem = ({ amount, count, sum, progressColor }) => {
    const barWidth = `${((count / sum) * 100).toFixed(1)}%`;

    return (
        <div
            className={cx('fr-agent-card__footer-item', {
                [`fr-agent-card__footer-item--${progressColor}`]: progressColor
            })}
            style={{ width: barWidth }}
        >
            <div className={cx('fr-agent-card__footer-item-counter')}>
                <span className={cx('icon icon-ok')} />
                <span className={cx('fr-agent-card__footer-item-counter-value')}>
                    {formatNumber(count, false)}
                </span>
            </div>
            <div className={cx('fr-agent-card__footer-item-cost')}>
                <span>{`${formatNumber(amount, true)} ₽`}</span>
            </div>
        </div>
    );
};

StatItem.propTypes = {
    amount: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
    progressColor: PropTypes.string.isRequired,
};

export default StatItem;
