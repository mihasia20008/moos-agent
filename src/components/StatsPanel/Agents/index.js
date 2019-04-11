import React from 'react';
import cx from 'classnames';

import CONTENT from '../../../contentConstants';

import { formatNumber } from '../../../services/utility';

const AgentsStatsPanel = ({ list }) => {
    const { statusItems } = CONTENT;
    const { company = {}, order = {} } = list;
    const { total = {} } = order;

    return (
        <div className={cx('fr-stats-panel')}>
            <div className={cx('fr-stats-panel__item')}>
                <span className={cx('fr-stats-panel__title')}>Агенты</span>
                <div className={cx('fr-stats-panel__stats')}>
                    <span className={cx('fr-stats-panel__stats-value')}>
                        {formatNumber(company.count ? company.count : 0)}
                    </span>
                </div>
            </div>
            <div className={cx('fr-stats-panel__item')}>
                <span className={cx('fr-stats-panel__title')}>Заявки</span>
                <div className={cx('fr-stats-panel__stats')}>
                    {statusItems.map(({ key, text, className }) => {
                        return (typeof order[key] !== 'undefined')
                            ? (
                                <span
                                    key={key}
                                    className={cx('fr-stats-panel__stats-value fr-stats-panel__stats-value--bold', {
                                        [`fr-stats-panel__stats-value--${className}`]: className
                                    })}
                                    title={text}
                                >
                                    {formatNumber(order[key].count)}
                                </span>
                            ) : null;
                    })}
                </div>
            </div>
            <div className={cx('fr-stats-panel__item')}>
                <span className={cx('fr-stats-panel__title')}>Сумма</span>
                <div className={cx('fr-stats-panel__stats')}>
                    <span className={cx('fr-stats-panel__stats-value')}>
                        {`${formatNumber(total.amount ? total.amount : 0, true)} ₽`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AgentsStatsPanel;
