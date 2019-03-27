import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import TextField from '../../../components/TextField';
import Dropdown from "../../../components/Dropdown";
import CheckboxList from "../../../components/CheckboxList";

class ClientsFilter extends PureComponent {
    static propTypes = {
        isDisable: PropTypes.bool,
        agents: PropTypes.array,
        filters: PropTypes.object,
        onChangeFilter: PropTypes.func.isRequired,
    };
    static defaultProps = {
        isDisable: false,
        agents: []
    };
    
    state = { isFixed: false };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    getAgentsFilter(agents, agentCompanyId = '') {
        const { filters, onChangeFilter } = this.props;
        let active = 0;
        const list = agents.reduce((acc, agent) => {
            if (agentCompanyId === agent.id) {
                active = acc.length;
            }
            const name = typeof agent.displayName !== 'undefined' && agent.displayName
                ? agent.displayName
                : typeof agent.shortName !== 'undefined' && agent.shortName
                    ? agent.shortName
                    : typeof agent.fullName !== 'undefined' && agent.fullName
                        ? agent.fullName
                        : undefined;
            return acc.concat([{ key: agent.id, value: name }]);
        }, [{ key: 'all', value: 'Все агенты' }]);
        if (list.length === 2) {
            active = 1;
            if (filters.agentCompanyId !== list[1].key) {
                onChangeFilter({ agentCompanyId: list[1].key });
            }
        }
        return { active, list };
    }

    handleScroll = () => {
        if (!this.state.isFixed && window.scrollY > 0) {
            this.setState({ isFixed: true });
            return;
        }
        if (this.state.isFixed && window.scrollY === 0) {
            this.setState({ isFixed: false });
        }
    };

    handleSelectDropdown = (name, key) => {
        const { onChangeFilter } = this.props;
        if (key === 'all') {
            onChangeFilter({ [`${name}`]: '' });
        } else {
            onChangeFilter({ [`${name}`]: key });
        }
    };

    handleTypeText = ({ target }) => this.props.onChangeFilter({ [`${target.name}`]: target.value });

    handleClearField = (name, value) => this.props.onChangeFilter({ [`${name}`]: value });

    handleCheckboxSelect = ({ target }) => this.props.onChangeFilter({ [`${target.name}`]: target.value });

    render() {
        const { isFixed } = this.state;
        const { isDisable, agents, filters } = this.props;

        const agentsFilter = this.getAgentsFilter(agents, filters.agentCompanyId);

        return (
            <div className={cx('main-filter', {
                'main-filter--fixed': isFixed,
            })}>
                <div className={cx('main-filter__container')}>
                    <div className={cx('main-filter__content')}>
                        <div className={cx('main-filter__row', {
                            'main-filter__row--disabled': isDisable,
                        })}>
                            <div className={cx('main-filter__control main-filter__control--icon-right')}>
                                <Dropdown
                                    name="agentCompanyId"
                                    toggleClassName="btn btn-dropdown--hidden-border"
                                    defaultActive={agentsFilter.active}
                                    list={agentsFilter.list}
                                    disabled={agentsFilter.list.length < 3}
                                    onSelectItem={this.handleSelectDropdown}
                                />
                                <i className={cx('icon icon-chevron-down')} />
                            </div>
                            <TextField
                                name="q"
                                placeholder="Клиент"
                                value={filters.q}
                                onChange={this.handleTypeText}
                                onClear={this.handleClearField}
                            />
                            <div className={cx('main-filter__control main-filter__control--button')}>
                                <Link className={cx('btn btn-search')} to="?search">
                                    <i className={cx('icon icon-seacrh-m')} />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('main-filter__row', {
                            'main-filter__row--disabled': isDisable,
                        })}>
                            <CheckboxList
                                activeValue={filters.status}
                                onChangeItem={this.handleCheckboxSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientsFilter;
