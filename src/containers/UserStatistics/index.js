import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import _uniqBy from 'lodash/uniqBy';

import Dropdown from '../../components/Dropdown';
import StatsToggler from '../../components/StatsToggler';
import StatsInfoBlock from '../../components/StatsInfoBlock';
import Overlay from '../../components/Overlay';

import { fetchPeriodsList, fetchEmployeeStat, fetchCompanyStat } from "../../redux/Statistics/actions";

class UserStatistics extends Component {
    static propTypes = {
        session_id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        fetchStatus: PropTypes.shape({
            periods: PropTypes.bool.isRequired,
            employee: PropTypes.bool.isRequired,
            company: PropTypes.bool.isRequired,
            widget: PropTypes.bool.isRequired,
        }).isRequired,
        periods: PropTypes.array.isRequired,
        employees: PropTypes.array.isRequired,
        companyStats: PropTypes.shape({
            items: PropTypes.object.isRequired,
            countSum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
            amountSum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
            noItems: PropTypes.bool.isRequired,
        }).isRequired,
        employeeStats: PropTypes.shape({
            items: PropTypes.object.isRequired,
            countSum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
            amountSum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
            noItems: PropTypes.bool.isRequired,
        }).isRequired,
    };

    state = {
        periods: {
            activeCompany: 0,
            activeEmployee: 0,
            list: [{ key: 'default', value: 'месяц' }]
        },
        employees: {
            active: 0,
            list: [{ key: 'default', value: 'Сотрудник' }]
        },
        indicator: 'count',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            periods: nextPeriods,
            employees: nextEmployees,
            username,
        } = nextProps;
        const {
            periods: { list: prevPeriodsList },
            employees: { list: prevEmployeesList, active: activeEmployee },
        } = prevState;
        const preparedPeriods = UserStatistics.getPreparedPeriods(prevPeriodsList, nextPeriods);

        const needCalcUserPosition = prevEmployeesList[activeEmployee].key !== username;
        const preparedEmployees = UserStatistics.getPreparedEmployees(
            prevEmployeesList,
            nextEmployees,
            needCalcUserPosition ? username : ''
        );

        if (Object.keys(preparedPeriods).length && Object.keys(preparedEmployees).length) {
            return {
                periods: preparedPeriods,
                employees: preparedEmployees,
            };
        }
        if (Object.keys(preparedEmployees).length) {
            return { employees: preparedEmployees };
        }
        if (Object.keys(preparedPeriods).length) {
            return { periods: preparedPeriods };
        }

        return {};
    }

    componentDidMount() {
        const { session_id, dispatch } = this.props;
        if (session_id) {
            dispatch(fetchPeriodsList(session_id));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { session_id, dispatch } = this.props;
        const {
            periods: {
                activeCompany: prevActiveCompanyPeriod,
                activeEmployee: prevActiveEmployeePeriod
            },
            employees: { active: prevActiveEmployee },
        } = prevState;
        const { periods, employees } = this.state;

        const {
            activeCompany: nexActiveCompanyPeriod,
            activeEmployee: nextActiveEmployeePeriod
        } = periods;
        const { active: nextActiveEmployee } = employees;

        if (nexActiveCompanyPeriod !== prevActiveCompanyPeriod) {
            const periodKey = periods.list[nexActiveCompanyPeriod].key;
            if (periodKey !== 'default') {
                dispatch(fetchCompanyStat(session_id, periodKey));
            }
        }

        if (nextActiveEmployeePeriod !== prevActiveEmployeePeriod ||
            nextActiveEmployee !== prevActiveEmployee) {
            const periodKey = periods.list[nextActiveEmployeePeriod].key;
            const username = employees.list[nextActiveEmployee].key;
            if (username !== 'default' && periodKey !== 'default') {
                dispatch(fetchEmployeeStat(session_id, periodKey, username));
            }
        }
    }

    static getPreparedPeriods(prevPeriodsList, nextPeriods) {
        const list = nextPeriods.reduce((acc, period) => {
            return acc.concat({ key: period.period, value: period.name });
        }, []);
        const uniqList = _uniqBy(prevPeriodsList.concat(list), 'key');
        if (uniqList.length === prevPeriodsList.length) {
            return {};
        }
        return {
            list,
            activeCompany: list.length - 1,
            activeEmployee: list.length - 1,
        };
    }

    static getPreparedEmployees(prevEmployeesList, nextEmployees, username) {
        const needCalculate = !!username;
        let active = 0;
        const list = nextEmployees.reduce((acc, employee, index) => {
            if (needCalculate && username === employee) {
                active = index;
            }
            return acc.concat({ key: employee, value: employee });
        }, []);
        const uniqList = _uniqBy(prevEmployeesList.concat(list), 'key');
        if (uniqList.length === prevEmployeesList.length) {
            return {};
        }
        return {
            list,
            active: active,
        };
    }

    handleSelectDropdown = (name, key, index) => {
        const preparedName = name.split('_');
        this.setState({
            [`${preparedName[0]}`]: Object.assign(
                {},
                this.state[preparedName[0]],
                {
                    [`active${preparedName[1] ? preparedName[1] : ''}`]: index
                }
            ),
        });
    };

    handleToggleIndicator = (indicator) => this.setState({ indicator });

    render() {
        const { periods, employees, indicator } = this.state;
        const { fetchStatus, companyStats, employeeStats } = this.props;

        return (
            <div className={cx('modal-content__inner chart-stats')}>
                <div className={cx('chart-stats__item')}>
                    <div className={cx('chart-stats__head')}>
                        <Dropdown
                            name="periods_Employee"
                            defaultText="Ваша статистика за"
                            defaultActive={periods.activeEmployee}
                            list={periods.list}
                            disabled={periods.list.length < 2}
                            onSelectItem={this.handleSelectDropdown}
                        />
                        <Dropdown
                            name="employees"
                            defaultActive={employees.active}
                            list={employees.list}
                            disabled={periods.list.length < 2}
                            onSelectItem={this.handleSelectDropdown}
                        />
                        <div className={cx('chart-stats__filter')}>
                            <StatsToggler
                                name="count"
                                text="Заявки"
                                isActive={indicator === 'count'}
                                onClick={this.handleToggleIndicator}
                            />
                            <StatsToggler
                                name="amount"
                                text="Деньги"
                                isActive={indicator === 'amount'}
                                onClick={this.handleToggleIndicator}
                            />
                        </div>
                    </div>
                    {fetchStatus.employee ? (
                        <div className={cx('chart-stats__item chart-stats__item--fetching')}>
                            <Overlay inverse />
                        </div>
                    ) : (
                        <div className={cx('chart-stats__body')}>
                            <StatsInfoBlock
                                infoBlock={employeeStats}
                                indicator={indicator}
                            />
                        </div>
                    )}
                </div>
                <div className={cx('chart-stats__item')}>
                    <div className={cx('chart-stats__head')}>
                        <Dropdown
                            name="periods_Company"
                            defaultText="Ваша статистика за"
                            defaultActive={periods.activeCompany}
                            list={periods.list}
                            onSelectItem={this.handleSelectDropdown}
                        />
                    </div>
                    {fetchStatus.employee ? (
                        <div className={cx('chart-stats__item chart-stats__item--fetching')}>
                            <Overlay inverse />
                        </div>
                    ) : (
                        <div className={cx('chart-stats__body')}>
                            <StatsInfoBlock
                                infoBlock={companyStats}
                                indicator={indicator}
                                globalColor="white"
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ User, Statistics }) => {
    return {
        fetchStatus: Statistics.fetchStatus,
        periods: Statistics.periods,
        companyStats: Statistics.company,
        employeeStats: Statistics.employee,
        session_id: User.session_id,
        username: User.username,
        employees: User.companyEmployees,
    };
};

export default connect(mapStateToProps)(UserStatistics);
