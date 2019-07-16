import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Dropdown from '../../../components/Dropdown';
import CheckboxList from '../../../components/CheckboxList';
import TextField from '../../../components/TextField';
import DatePicker from '../../../components/DatePicker';
import RangeSlider from '../../../components/RangeSlider';
import TextFieldWithAutoComplete from '../../../components/TextFieldWithAutoComplete';

class TasksFilter extends PureComponent {
    static propTypes = {
        isDisable: PropTypes.bool,
        filters: PropTypes.object,
        filterAmount: PropTypes.shape({
            from: PropTypes.number,
            to: PropTypes.number,
        }),
        onChangeFilter: PropTypes.func.isRequired,
    };
    static defaultProps = { isDisable: false };

    state = { isFixed: false };

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    getProcessesFilter(processes, orderTypeRefId = '') {
        const { filters, onChangeFilter } = this.props;
        let active = 0;
        const list = processes.reduce((acc, process) => {
            if (orderTypeRefId === process.process_type) {
                active = acc.length;
            }
            return acc.concat([{ key: process.process_type, value: process.process_name }]);
        }, [{ key: 'all', value: 'Все процессы' }]);
        if (list.length === 2) {
            active = 1;
            if (filters.orderTypeRefId !== list[1].key) {
                onChangeFilter({ orderTypeRefId: list[1].key });
            }
        }
        return { active, list };
    }

    static getPhaseFilter(processes, activeProcess, phaseId = '') {
        let active = 0;
        const { phases = [] } = processes[activeProcess];
        const list = phases.reduce((acc, phase) => {
            if (phaseId === phase.phaseId) {
                active = acc.length;
            }
            return acc.concat([{ key: phase.phaseId, value: phase.phaseName }]);
        }, [{ key: 'all', value: 'Все фазы' }]);
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

    handleClearField = (name, value) => this.props.onChangeFilter({ [`${name}`]: value });

    handleSelectDropdown = (name, key) => {
        const { onChangeFilter } = this.props;
        if (name === 'orderTypeRefId' && key === 'all') {
            onChangeFilter({
                [`${name}`]: '',
                phaseId: '',
            });
            return;
        }
        if (key === 'all') {
            onChangeFilter({ [`${name}`]: '' });
        } else {
            onChangeFilter({ [`${name}`]: key });
        }
    };

    handleCheckboxSelect = ({ target }) => {
        if (target.value === 'all') {
            this.handleClearField(target.name, '');
        } else {
            this.props.onChangeFilter({ [`${target.name}`]: target.value });
        }
    };

    handleTypeText = ({ target }) => this.props.onChangeFilter({ [`${target.name}`]: target.value });

    handleSelectDate = ({ target }) => {
        const values = target.value.split('/');
        this.props.onChangeFilter({
            [`${target.name}`]: {
                from: values[0],
                to: values[1],
            },
        });
    };

    handleEndMovingSlider = (name, value) => {
        this.props.onChangeFilter({
            [`${name}`]: {
                from: value[0],
                to: value[1],
            },
        });
    };

    handleSearchSelect = (name, value) => {
        const { onChangeFilter } = this.props;
        onChangeFilter({ [`${name}`]: value })
    };

    render() {
        const { isFixed } = this.state;
        const { isDisable, filters, filterAmount, processes, statusItems } = this.props;

        const processesFilter = this.getProcessesFilter(processes, filters.orderTypeRefId);
        const phaseFilter = filters.orderTypeRefId
            ? TasksFilter.getPhaseFilter(processes, processesFilter.active - 1, filters.phaseId)
            : { list: [{ key: 'all', value: 'Все фазы' }] };

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
                                    name="orderTypeRefId"
                                    toggleClassName="btn btn-dropdown--hidden-border"
                                    defaultActive={processesFilter.active}
                                    list={processesFilter.list}
                                    disabled={processesFilter.list.length < 3}
                                    onSelectItem={this.handleSelectDropdown}
                                />
                                <i className={cx('icon icon-chevron-down')} />
                            </div>
                            <div className={cx('main-filter__control main-filter__control--icon-right')}>
                                <Dropdown
                                    name="phaseId"
                                    toggleClassName="btn btn-dropdown--hidden-border"
                                    defaultActive={phaseFilter.active}
                                    list={phaseFilter.list}
                                    disabled={phaseFilter.list.length < 3}
                                    onSelectItem={this.handleSelectDropdown}
                                />
                                <i className={cx('icon icon-chevron-down')} />
                            </div>
                            <DatePicker
                                name="createdDate"
                                defaultActive={filters.createdDate}
                                onSelectDate={this.handleSelectDate}
                                onClear={this.handleClearField}
                            />
                            <TextField
                                name="orderNumber"
                                placeholder="Номер заявки"
                                value={filters.orderNumber}
                                onChange={this.handleTypeText}
                                onClear={this.handleClearField}
                            />
                            <TextFieldWithAutoComplete
                                name="principalCompanyId"
                                value={filters.principalCompanyId}
                                onSelect={this.handleSearchSelect}
                                onClear={this.handleClearField}
                                placeholder="Клиент"
                                classNames={{
                                    container: cx('main-filter__control'),
                                    input: cx('main-filter__control-field')
                                }}
                            />
                            {/*<div className={cx('main-filter__control main-filter__control--button')}>*/}
                                {/*<Link className={cx('btn btn-search')} to="?search">*/}
                                    {/*<i className={cx('icon icon-seacrh-m')} />*/}
                                {/*</Link>*/}
                            {/*</div>*/}
                        </div>
                        <div className={cx('main-filter__row', {
                            'main-filter__row--disabled': isDisable,
                        })}>
                            <CheckboxList
                                statusItems={statusItems}
                                activeValue={filters.status}
                                onChangeItem={this.handleCheckboxSelect}
                            />
                            <RangeSlider
                                name="amount"
                                defaultActive={filterAmount}
                                onEndChanging={this.handleEndMovingSlider}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TasksFilter;
