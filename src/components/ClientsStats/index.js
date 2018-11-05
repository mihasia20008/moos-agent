import React from 'react';
import cx from 'classnames';

const ClientsStats = () => {
    return (
        <div className={cx('main-stats')}>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Клиенты</span>
                <span className={cx('main-stats__value')}>122 871</span>
            </div>
            <div className={cx('main-stats__item')}>
                <span className={cx('main-stats__title')}>Сделки</span>
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

export default ClientsStats;
