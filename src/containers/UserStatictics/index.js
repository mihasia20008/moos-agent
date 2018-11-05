import React from 'react';
import cx from 'classnames';

const UserStatictics = () => {
    return (
        <div className={cx('modal-content__inner chart-stats')}>
            <div className={cx('chart-stats__item')}>
                <div className={cx('chart-stats__head')}>
                    <div className={cx('dropdown')}>
                        <a className={cx('btn-dropdown dropdown-toggle')} href="javasctipt::void(0);" role="button" id="dropdownMenu1Link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ваша статистика за август
                        </a>
                        <div className={cx('dropdown-menu')} aria-labelledby="dropdownMenu1Link">
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Сентябрь</a>
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Октябрь</a>
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Ноябрь</a>
                        </div>
                    </div>
                    <div className={cx('dropdown')}>
                        <a className={cx('btn-dropdown dropdown-toggle')} href="javasctipt::void(0);" role="button" id="dropdownMenu2Link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Сотрудник
                        </a>
                        <div className={cx('dropdown-menu')} aria-labelledby="dropdownMenu2Link">
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Сотрудник 1</a>
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Сотрудник 2</a>
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Сотрудник 3</a>
                        </div>
                    </div>
                    <div className={cx('chart-stats__filter')}>
                        <a href="javasctipt::void(0);" className={cx('chart-stats__filter-item chart-stats__filter-item--active')}>Заявки</a>
                        <a href="javasctipt::void(0);" className={cx('chart-stats__filter-item')}>Деньги</a>
                    </div>
                </div>
                <div className={cx('chart-stats__body')}>
                    <div className={cx('chart-stats__chart-wrapper')}>
                        <img src="./img/chart-1.png" alt="" />
                    </div>
                    <div className={cx('chart-stats__info')}>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main')}>
                                    120
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>Подано заявок</span>
                                    <span>4 348 159.12 ₽</span>
                                </div>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--purple')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '44.4%' }}></div>
                            </div>
                        </div>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main')}>
                                    95
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>В процессе</span>
                                    <span>148 000.00 ₽</span>
                                </div>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--yellow')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '32.3%' }}></div>
                            </div>
                        </div>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main')}>
                                    22
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>Отказано</span>
                                    <span>24 444 100.00 ₽</span>
                                </div>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--red')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '16%' }}></div>
                            </div>
                        </div>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main')}>
                                    245
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>Одобрено</span>
                                    <span>500 500.50 ₽</span>
                                </div>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--green')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '72.2%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('chart-stats__item')}>
                <div className={cx('chart-stats__head')}>
                    <div className={cx('dropdown')}>
                        <a className={cx('btn-dropdown dropdown-toggle')} href="javasctipt::void(0);" role="button" id="dropdownMenu3Link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Cтатистика компании за август
                        </a>
                        <div className={cx('dropdown-menu')} aria-labelledby="dropdownMenu3Link">
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Сентябрь</a>
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Октябрь</a>
                            <a className={cx('dropdown-item')} href="javasctipt::void(0);">Ноябрь</a>
                        </div>
                    </div>
                </div>
                <div className={cx('chart-stats__body')}>
                    <div className={cx('chart-stats__chart-wrapper')}>
                        <img src="./img/chart-2.png" alt="" />
                    </div>
                    <div className={cx('chart-stats__info')}>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main chart-stats__info-stats-main--md')}>
                                    2 120
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>Отдел аудита</span>
                                    <span>421 348 159.12 ₽</span>
                                </div>
                                <span className={cx('badge')}>+3.123%</span>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--white')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '17%' }}></div>
                            </div>
                        </div>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main chart-stats__info-stats-main--md')}>
                                    12 988
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>Отдел кредитов</span>
                                    <span>421 348 159.12 ₽</span>
                                </div>
                                <span className={cx('badge')}>+12.9%</span>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--white')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '72.3%' }}></div>
                            </div>
                        </div>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main chart-stats__info-stats-main--md')}>
                                    9 812
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>Отдел лизинга</span>
                                    <span>421 348 159.12 ₽</span>
                                </div>
                                <span className={cx('badge')}>-9.81%</span>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--white')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '44%' }}></div>
                            </div>
                        </div>
                        <div className={cx('chart-stats__info-item')}>
                            <div className={cx('chart-stats__info-stats')}>
                                <div className={cx('chart-stats__info-stats-main chart-stats__info-stats-main--md')}>
                                    8 800
                                </div>
                                <div className={cx('chart-stats__info-stats-secondary')}>
                                    <span className={cx('chart-stats__info-stats-title')}>Отдел продаж</span>
                                    <span>421 348 159.12 ₽</span>
                                </div>
                                <span className={cx('badge')}>+0.113%</span>
                            </div>
                            <div className={cx('chart-stats__info-progress chart-stats__info-progress--white')}>
                                <div className={cx('chart-stats__info-progress-bar')} style={{ width: '44%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStatictics;
