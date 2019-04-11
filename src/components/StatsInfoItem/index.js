import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

import { formatNumber } from '../../services/utility';

const StatsInfoItem = ({ text, mainCount, subCount, sum, badge, progressColor, mainKey }) => {
    const barWidth = `${((mainCount / sum) * 100).toFixed(1)}%`;
    const isMainAmount = mainKey === 'amount';

    return (
        <div className={cx('chart-stats__info-item')}>
            <div className={cx('chart-stats__info-stats')}>
                <div className={cx('chart-stats__info-stats-main', {
                    'chart-stats__info-stats-main--md': !isMainAmount,
                    'chart-stats__info-stats-main--xl': isMainAmount,
                })}>
                    {formatNumber(mainCount, isMainAmount)}{isMainAmount ? ' ₽' : ''}
                </div>
                <div className={cx('chart-stats__info-stats-secondary')}>
                    <span className={cx('chart-stats__info-stats-title')}>
                        {text}
                    </span>
                    <span>
                        {formatNumber(subCount, !isMainAmount)}{isMainAmount ? '': ' ₽'}
                    </span>
                </div>
                {badge ? (
                    <span className={cx('badge')}>
                        {badge > 0 ? `+${badge}` : badge}%
                    </span>
                ) : null}
            </div>
            <div
                className={cx('chart-stats__info-progress', {
                    [`chart-stats__info-progress--${progressColor}`]: progressColor
                })}
            >
                <div className={cx('chart-stats__info-progress-bar')} style={{ width: barWidth }} />
            </div>
        </div>
    );
};

StatsInfoItem.propTypes = {
    text: PropTypes.string.isRequired,
    mainCount: PropTypes.number.isRequired,
    subCount: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
    badge: PropTypes.number,
    progressColor: PropTypes.string.isRequired,
    mainKey: PropTypes.string.isRequired,
};

export default StatsInfoItem;
