import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import cx from 'classnames';

import logo from './logo-min.svg';

import ProgressStatistic from '../../components/ProgressStatistic';
import UserMenu from '../../components/UserMenu';

import { logoutUser } from '../../redux/User/actions';
import { fetchWidgetData } from "../../redux/Statistics/actions";

class Sidebar extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        isManager: PropTypes.bool,
        widget: PropTypes.shape({
            items: PropTypes.object.isRequired,
            sum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
            noItems: PropTypes.bool.isRequired,
        }).isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    static defaultProps = {
        name: '',
        isManager: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchWidgetData());
    }

    handleLogout = () => {
        const { settings, dispatch } = this.props;
        dispatch(logoutUser(settings.authType));
    };

    renderStatsWidget() {
        const { widget, settings } = this.props;

        if (widget.noItems) {
            return null;
        }

        return (
            <div className={cx('fr-sidebar-bm__statistics-cont progress-statistic')}>{
                settings.statusItems.map(({ key, text, className }, index) => {
                    return (typeof widget.items[key] !== 'undefined')
                        ? (
                            <ProgressStatistic
                                key={index}
                                count={widget.items[key].count}
                                sum={widget.sum}
                                text={text}
                                className={className}
                            />
                        ) : null;
                })
            }</div>
        )
    }

    render() {
        const { name, isManager } = this.props;

        return (
            <section className={cx('fr-sidebar')}>
                <Link className={cx('fr-sidebar__logo')} to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div className={cx('fr-sidebar__menu')}>
                    <NavLink to="/tasks" activeClassName={cx('active')}>
                        <span className={cx('icon icon-ok')} />
                        Заявки
                    </NavLink>
                    <NavLink to="/clients" activeClassName={cx('active')}>
                        <span className={cx('icon icon-user')} />
                        Клиенты
                    </NavLink>
                    {isManager ? (
                        <NavLink to="/agents" activeClassName={cx('active')}>
                            <span className={cx('icon icon-user')} />
                            Агенты
                        </NavLink>
                    ) : null}
                </div>
                <div className={cx('fr-sidebar-bm')}>
                    <div className={cx('fr-sidebar-bm__statistics')}>
                        {this.renderStatsWidget()}
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

const mapStateToProps = ({ User, Statistics }) => {
    return {
        settings: User.settings,
        name: User.fullname,
        isManager: User.ismanager,
        widget: Statistics.widget,
    };
};

export default withRouter(connect(mapStateToProps)(Sidebar));
