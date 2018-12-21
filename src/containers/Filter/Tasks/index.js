import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import ReactBootstrapSlider from 'react-bootstrap-slider';

import Dropdown from '../../../components/Dropdown';
import CheckboxList from '../../../components/CheckboxList';
import TextField from '../../../components/TextField';
import DatePicker from '../../../components/DatePicker';

class TasksFilter extends PureComponent {
    static propTypes = {
        isDisable: PropTypes.bool,
        filters: PropTypes.object,
        onChangeFilter: PropTypes.func.isRequired,
    };
    static defaultProps = { isDisable: false };

    state = {
        isFixed: false,
        taskFilter: {
            active: 1,
            list: [
                { key: 'all', value: 'Все заявки' },
                { key: 'current', value: 'Текущие заявки' },
                { key: 'closed', value: 'Завершенные заявки' },
            ],
        },
    };

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
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
    
    changeValue = (event) => console.log(event);

    handleSelectDropdown = (name, key) => {
        console.log(name, key);
    };

    handleCheckboxSelect = ({ target }) => this.props.onChangeFilter(target.name, target.value);

    handleTypeText = ({ target }) => this.props.onChangeFilter(target.name, target.value);

    handleSelectDate = ({ target }) => {
        const values = target.value.split('/');
        this.props.onChangeFilter(target.name, {
            from: values[0],
            to: values[1],
        });
    };

    render() {
        const { isFixed, taskFilter } = this.state;
        const { isDisable, filters } = this.props;

        return (
            <div className={cx('main-filter', {
                'main-filter--fixed': isFixed,
            })}>
                <div className={cx('main-filter__container')}>
                    <div className={cx('main-filter__content')}>
                        <div className={cx('main-filter__row', {
                            'main-filter__row--disabled': isDisable,
                        })}>
                            <Dropdown
                                name="taskFilter"
                                defaultActive={taskFilter.active}
                                list={taskFilter.list}
                                onSelectItem={this.handleSelectDropdown}
                            />
                            <Dropdown
                                name="taskFilter"
                                defaultActive={taskFilter.active}
                                list={taskFilter.list}
                                onSelectItem={this.handleSelectDropdown}
                            />
                            <DatePicker
                                name="createdDate"
                                defaultActive={filters.createdDate}
                                onSelectDate={this.handleSelectDate}
                            />
                            <TextField
                                value={filters.orderNumber}
                                onChange={this.handleTypeText}
                            />
                            <div className={cx('main-filter__control')}>
                                <input type="text" className={cx('main-filter__control-field')} placeholder="Клиент" />
                            </div>
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
                            <div className={cx('filter-slider')}>
                                <span>От 30К ₽</span>
                                <ReactBootstrapSlider
                                    className={cx('filter-slider__control')}
                                    value={[45000, 5900000]}
                                    change={this.changeValue}
                                    slideStop={this.changeValue}
                                    step={10}
                                    max={6900000}
                                    min={30000} />
                                <span>До 6.9М ₽</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TasksFilter;
