import React from 'react';
import cx from 'classnames';

const ProgressStatistic = ({ counter, text, barWidth, className }) => {
    return (
        <div className={cx(`progress-statistic__item${className ? ` ${className}` : ''}`)}>
            <span className={cx('progress-statistic__counter')}>{counter}</span>
            <span className={cx('progress-statistic__status')}>{text}</span>
            <span className={cx('progress-statistic__bar')} style={{ width: barWidth }} />
        </div>
    );
};

export default ProgressStatistic;
