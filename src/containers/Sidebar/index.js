import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';

import ProgressStatistic from '../../components/ProgressStatistic';
import UserMenu from '../../components/UserMenu';

import { logoutUser } from '../../redux/User/actions';
import { fetchWidgetData } from "../../redux/Statistics/actions";

import { statusItems } from '../../contentConstants';

class Sidebar extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        session_id: PropTypes.string.isRequired,
        noWidgetItems: PropTypes.bool.isRequired,
        widgetItems: PropTypes.object.isRequired,
        widgetSum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        logoutUser: PropTypes.func.isRequired,
        fetchWidgetData: PropTypes.func.isRequired,
    };
    static defaultProps = { name: '' };

    componentDidMount() {
        const { session_id, fetchWidgetData } = this.props;
        if (typeof session_id !== 'undefined') {
            fetchWidgetData(session_id);
        }
    }

    handleLogout = () => {
        const { session_id, logoutUser } = this.props;
        logoutUser(session_id);
    };

    renderStatsWidget() {
        const { noWidgetItems, widgetItems, widgetSum } = this.props;

        if (noWidgetItems) {
            return null;
        }

        return (
            <div className={cx('fr-sidebar-bm__statistics-cont progress-statistic')}>{
                statusItems.map(({ key, text, className }, index) => {
                    return (typeof widgetItems[key] !== 'undefined')
                        ? (
                            <ProgressStatistic
                                key={index}
                                count={widgetItems[key].count}
                                sum={widgetSum}
                                text={text}
                                className={className}
                            />
                        ) : null;
                })
            }</div>
        )
    }

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
        name: User.fullname,
        session_id: User.session_id,
        noWidgetItems: Object.keys(Statistics.widgetItems).length === 0,
        widgetItems: Statistics.widgetItems,
        widgetSum: Statistics.widgetSum,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (session_id) => dispatch(logoutUser(session_id)),
        fetchWidgetData: (session_id) => dispatch(fetchWidgetData(session_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidebar);
