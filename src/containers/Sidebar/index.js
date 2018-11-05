import React, { PureComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';

import ProgressStatistic from '../../components/ProgressStatistic';

const statistics = [{
    counter: 20,
    text: 'Отказано',
    barWidth: '55.8%',
    className: 'progress-statistic__item--red',
}, {
    counter: 8,
    text: 'Одобрено',
    barWidth: '32.2%',
    className: 'progress-statistic__item--green',
}, {
    counter: 34,
    text: 'В процессе',
    barWidth: '69.7%',
    className: 'progress-statistic__item--yellow',
}, {
    counter: 2,
    text: 'Подано',
    barWidth: '13%',
    className: 'progress-statistic__item--purple',
}];

class Sidebar extends PureComponent {

    handleOpenUserMenu = ({ target }) => {
        target.closest('.fr-user-menu').classList.toggle('open');
    }

    render() {
        return (
            <section className={cx('fr-sidebar')}>
                <Link className={cx('fr-sidebar__logo')} to="/">
                    <img src="static/media/logo-min.svg" alt="logo" />
                </Link>
                <div className={cx('fr-sidebar__menu')}>
                    <NavLink to="/tasks" activeClassName={cx('fr-sidebar__menu--active')}>
                        <span className={cx('icon icon-ok')} />
                        Задачи
                    </NavLink>
                    <NavLink to="/clients" activeClassName={cx('fr-sidebar__menu--active')}>
                        <span className={cx('icon icon-user')} />
                        Клиенты
                    </NavLink>
                </div>
                <div className={cx('fr-sidebar-bm')}>
                    <div className={cx('fr-sidebar-bm__statistics')}>
                        <div className={cx('fr-sidebar-bm__statistics-cont progress-statistic')}>{
                            statistics.map((statistic, index) => <ProgressStatistic key={index} {...statistic} />)
                        }</div>
                        <div className={cx('fr-sidebar-bm__statistics-btn')}>
                            <Link to="?show-statistic" data-toggle="modal" data-target="#statsModal">
                                Смотреть статистику
                            </Link>
                        </div>
                    </div>
                    <div className={cx('fr-user-menu')}>
                        <div className={cx('fr-user-menu__dropdown')}>
                            <div className={cx('fr-user-menu__list')}>
                                <Link className={cx('fr-user-menu__item')} to="?settings">
                                    <i className={cx('icon icon-settings')} />
                                    Настройки
                                </Link>
                                <Link className={cx('fr-user-menu__item')} to="/">
                                    <i className={cx('icon icon-exit')} />
                                    Выход
                                </Link>
                            </div>
                        </div>
                        <div className={cx('fr-user-menu__main')} onClick={this.handleOpenUserMenu}>
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
