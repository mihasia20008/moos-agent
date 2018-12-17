import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import ReactBootstrapSlider from 'react-bootstrap-slider';

import Dropdown from '../../../components/Dropdown';

class TasksFilter extends PureComponent {
    static propTypes = { isDisable: PropTypes.bool };
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

    render() {
        const { isFixed, taskFilter } = this.state;
        const { isDisable } = this.props;

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
                            <div className={cx('main-filter__control main-filter__control--icon-left')}>
                                <i className={cx('icon icon-calendar')} />
                                <input type="text" className={cx('main-filter__control-field')} placeholder="Даты" />
                            </div>
                            <div className={cx('main-filter__control')}>
                                <input type="text" className={cx('main-filter__control-field')} placeholder="Номер заявки" />
                            </div>
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
                            <div className={cx('checkbox-list')}>
                                <div className={cx('checkbox-list__item checkbox-list__item--purple')}>
                                    <input type="radio" name="main-filter" id="mainFilterCheckbox1" />
                                    <label htmlFor="mainFilterCheckbox1">Подано</label>
                                </div>
                                <div className={cx('checkbox-list__item checkbox-list__item--red')}>
                                    <input type="radio" name="main-filter" id="mainFilterCheckbox2" />
                                    <label htmlFor="mainFilterCheckbox2">Отказано</label>
                                </div>
                                <div className={cx('checkbox-list__item checkbox-list__item--orange')}>
                                    <input type="radio" name="main-filter" id="mainFilterCheckbox3" />
                                    <label htmlFor="mainFilterCheckbox3">В процессе</label>
                                </div>
                                <div className={cx('checkbox-list__item checkbox-list__item--blue')}>
                                    <input type="radio" name="main-filter" id="mainFilterCheckbox4" />
                                    <label htmlFor="mainFilterCheckbox4">Одобрено</label>
                                </div>
                            </div>
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
