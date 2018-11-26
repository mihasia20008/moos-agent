import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';

import ProgressStatistic from '../../components/ProgressStatistic';
import UserMenu from '../../components/UserMenu';

import { logoutUser } from '../../redux/User/actions';

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
    static propTypes = {
        name: PropTypes.string,
        session_id: PropTypes.string.isRequired,
        logoutUser: PropTypes.func.isRequired,
    };
    static defaultProps = { name: '' };

    handleLogout = () => {
        const { session_id, logoutUser } = this.props;
        logoutUser(session_id);
    };

    render() {
        const { name } = this.props;

        return (
            <section className={cx('fr-sidebar')}>
                <Link className={cx('fr-sidebar__logo')} to="/">
                    <img src="static/media/logo-min.svg" alt="logo" />
                </Link>
                <div className={cx('fr-sidebar__menu')}>
                    <NavLink to="/tasks" activeClassName={cx('active')}>
                        <span className={cx('icon icon-ok')} />
                        Задачи
                    </NavLink>
                    <NavLink to="/clients" activeClassName={cx('active')}>
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
                            <Link to="?show-statistic">
                                Смотреть статистику
                            </Link>
                        </div>
                    </div>
                    <UserMenu
                        name={name}
                        onLogout={this.handleLogout}
                    />
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ User }) => {
    return {
        name: User.fullname,
        session_id: User.session_id,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (session_id) => dispatch(logoutUser(session_id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidebar);
