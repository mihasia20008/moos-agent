import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ProgressStatistic = ({ counter, text, barWidth, className }) => {
    return (
        <div className={cx(`progress-statistic__item ${className}`)}>
            <span className={cx('progress-statistic__counter')}>{counter}</span>
            <span className={cx('progress-statistic__status')}>{text}</span>
            <span className={cx('progress-statistic__bar')} style={{ width: barWidth }} />
        </div>
    );
};

ProgressStatistic.propTypes = {
    counter: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    barWidth: PropTypes.string.isRequired,
    className: PropTypes.string,
};

ProgressStatistic.defaultProps = {
    className: '',
};

export default ProgressStatistic;
