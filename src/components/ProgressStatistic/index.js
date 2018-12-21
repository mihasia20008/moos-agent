import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ProgressStatistic = ({ count, sum, text, className }) => {
    const barWidth = `${((count / sum) * 100).toFixed(1)}%`;

    return (
        <div className={cx('progress-statistic__item', {
            [`progress-statistic__item--${className}`]: className
        })}>
            <span className={cx('progress-statistic__counter')}>{count}</span>
            <span className={cx('progress-statistic__status')}>{text}</span>
            <span className={cx('progress-statistic__bar')} style={{ width: barWidth }} />
        </div>
    );
};

ProgressStatistic.propTypes = {
    count: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
};

ProgressStatistic.defaultProps = {
    className: '',
};

export default ProgressStatistic;
