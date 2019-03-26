import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatNumber } from '../../../services/utility';

const ClientsStatsPanel = ({ clientsCount }) => {
    return (
        <div className={cx('main-stats')}>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Клиенты</span>
                <span className={cx('main-stats__value')}>{formatNumber(clientsCount)}</span>
            </div>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Заявки</span>
                <ul className={cx('deals-list')}>
                    <li className={cx('deals-list__item')}>&mdash;</li>
                    <li className={cx('deals-list__item deals-list__item--purple')}>&mdash;</li>
                    <li className={cx('deals-list__item deals-list__item--yellow')}>&mdash;</li>
                    <li className={cx('deals-list__item deals-list__item--red')}>&mdash;</li>
                    <li className={cx('deals-list__item deals-list__item--green')}>&mdash;</li>
                </ul>
            </div>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Сумма</span>
                <span className={cx('main-stats__value')}>&mdash; ₽</span>
            </div>
        </div>
    );
};

ClientsStatsPanel.propTypes = {
    clientsCount: PropTypes.number,
};

ClientsStatsPanel.defaultProps = {
    clientsCount: 0,
};

export default ClientsStatsPanel;
