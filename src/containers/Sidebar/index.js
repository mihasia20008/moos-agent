import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

class Sidebar extends PureComponent {
    render() {
        return (
            <section className={cx('fr-sidebar')}>
                <Link className={cx('fr-sidebar__logo')} to="/">
                    <img src="static/media/logo-min.svg" alt="logo" />
                </Link>
                <ul className={cx('fr-sidebar__menu')}>
                    <li className={cx('fr-sidebar__menu--active')}>
                        <span className={cx('icon icon-ok')}></span>
                        <Link to="/tasks">Задачи</Link>
                    </li>
                    <li>
                        <span className={cx('icon icon-user')}></span>
                        <Link to="/clients">Клиенты</Link>
                    </li>
                </ul>
                <div className={cx('fr-sidebar-bm')}>
                    <div className={cx('fr-sidebar-bm__values statistic-values')}>
                        <div className={cx('statistic-values__total')}>+48 159.12 ₽</div>
                    </div>
                    <div className={cx('fr-sidebar-bm__statistics')}>
                        <div className={cx('fr-sidebar-bm__statistics-cont progress-statistic')}>
                            <div className={cx('progress-statistic__item progress-statistic__item--red')}>
                                <span className={cx('progress-statistic__counter')}>20</span>
                                <span className={cx('progress-statistic__status')}>Отказано</span>
                                <span className={cx('progress-statistic__bar')} style={{ width: '55.8%' }} />
                            </div>
                            <div className={cx('progress-statistic__item progress-statistic__item--green')}>
                                <span className={cx('progress-statistic__counter')}>8</span>
                                <span className={cx('progress-statistic__status')}>Одобрено</span>
                                <span className={cx('progress-statistic__bar')} style={{ width: '32.2%' }} />
                            </div>
                            <div className={cx('progress-statistic__item progress-statistic__item--yellow')}>
                                <span className={cx('progress-statistic__counter')}>34</span>
                                <span className={cx('progress-statistic__status')}>В процессе</span>
                                <span className={cx('progress-statistic__bar')} style={{ width: '69.7%' }} />
                            </div>
                            <div className={cx('progress-statistic__item progress-statistic__item--purple')}>
                                <span className={cx('progress-statistic__counter')}>2</span>
                                <span className={cx('progress-statistic__status')}>Подано</span>
                                <span className={cx('progress-statistic__bar')} style={{ width: '13%' }} />
                            </div>
                        </div>
                        <div className={cx('fr-sidebar-bm__statistics-btn')}>
                            <Link to="?show-statistic" data-toggle="modal" data-target="#statsModal">
                                Смотреть статистику
                            </Link>
                        </div>
                    </div>
                    <div className={cx('fr-user-menu')}>
                        <div className={cx('fr-user-menu__dropdown')}>
                            <div className={cx('fr-user-menu__list')}>
                                <Link className={cx('fr-user-menu__item')} to="/settings">
                                    <i className={cx('icon icon-settings')} />
                                    Настройки
                                </Link>
                                <Link className={cx('fr-user-menu__item')} to="/profile">
                                    <i className={cx('icon icon-profile')} />
                                    Профиль
                                </Link>
                                <Link className={cx('fr-user-menu__item')} to="?logout">
                                    <i className={cx('icon icon-exit')} />
                                    Выход
                                </Link>
                            </div>
                        </div>
                        <div className={cx('fr-user-menu__main')}>
                            <div className={cx('fr-user-menu__name')}>
                                <span className={cx('icon icon-user')} />
                                Созонов В.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Sidebar;
