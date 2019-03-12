import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatNumber } from '../../../services/utility';

const ClientsStatsPanel = ({ clientsCount }) => {
    return (
        <div className={cx('main-stats', 'fr-stats-panel')}>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Клиенты</span>
                <span className={cx('main-stats__value')}>{formatNumber(clientsCount)}</span>
            </div>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Заявки</span>
                <ul className={cx('deals-list')}>
                    <li className={cx('deals-list__item')}>192 821</li>
                    <li className={cx('deals-list__item deals-list__item--purple')}>1241</li>
                    <li className={cx('deals-list__item deals-list__item--yellow')}>9124</li>
                    <li className={cx('deals-list__item deals-list__item--red')}>37 888</li>
                    <li className={cx('deals-list__item deals-list__item--green')}>87 125</li>
                </ul>
            </div>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Сумма</span>
                <span className={cx('main-stats__value')}>421 348 159.12 ₽</span>
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
