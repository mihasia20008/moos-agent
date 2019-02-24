import React from 'react';
import cx from 'classnames';

const AgentsStatsPanel = () => {
    return (
        <div className={cx('fr-stats-panel')}>
            <div className={cx('fr-stats-panel__item')}>
                <span className={cx('fr-stats-panel__title')}>Клиенты</span>
                <div className={cx('fr-stats-panel__stats')}>
                    <span className={cx('fr-stats-panel__stats-value')}>122 871</span>
                </div>
            </div>
            <div className={cx('fr-stats-panel__item')}>
                <span className={cx('fr-stats-panel__title')}>Сделки</span>
                <div className={cx('fr-stats-panel__stats')}>
                    <span className={cx('fr-stats-panel__stats-value fr-stats-panel__stats-value--bold')}>
                        192 821
                    </span>
                    <span
                        className={cx('fr-stats-panel__stats-value fr-stats-panel__stats-value--bold fr-stats-panel__stats-value--purple')}
                    >
                        1241
                    </span>
                    <span
                        className={cx('fr-stats-panel__stats-value fr-stats-panel__stats-value--bold fr-stats-panel__stats-value--yellow')}
                    >
                        9124
                    </span>
                    <span
                        className={cx('fr-stats-panel__stats-value fr-stats-panel__stats-value--bold fr-stats-panel__stats-value--red')}
                    >
                        37 888
                    </span>
                    <span
                        className={cx('fr-stats-panel__stats-value fr-stats-panel__stats-value--bold fr-stats-panel__stats-value--green')}
                    >
                        87 125
                    </span>
                </div>
            </div>
            <div className={cx('fr-stats-panel__item')}>
                <span className={cx('fr-stats-panel__title')}>Сумма</span>
                <div className={cx('fr-stats-panel__stats')}>
                    <span className={cx('fr-stats-panel__stats-value')}>421 348 159.12 ₽</span>
                </div>
            </div>
        </div>
    );
};

export default AgentsStatsPanel;
