import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatNumber } from '../../../services/utility';

const ClientsStatsPanel = ({ companiesStat, statusItems }) => {
    const { count = 0, order = {} } = companiesStat;
    const { total = {} } = order;

    return (
        <div className={cx('main-stats')}>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Клиенты</span>
                <span className={cx('main-stats__value')}>{formatNumber(count)}</span>
            </div>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Заявки</span>
                <ul className={cx('deals-list')}>
                    {statusItems.map(({ key, text, className }) => {
                        return (typeof order[key] !== 'undefined')
                            ? (

                                <li
                                    key={key}
                                    className={cx('deals-list__item', {
                                        [`deals-list__item--${className}`]: className
                                    })}
                                    title={text}
                                >
                                    {formatNumber(order[key].count)}
                                </li>
                            ) : null;
                    })}
                </ul>
            </div>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Сумма</span>
                <span className={cx('main-stats__value')}>
                    {`${formatNumber(total.amount ? total.amount : 0, true)} ₽`}
                </span>
            </div>
        </div>
    );
};

ClientsStatsPanel.propTypes = {
    companiesStat: PropTypes.shape({
        count: PropTypes.number,
        order: PropTypes.object,
    }),
};

ClientsStatsPanel.defaultProps = {
    companiesStat: {
        count: 0,
        order: {},
    },
    statusItems: []
};

export default ClientsStatsPanel;
