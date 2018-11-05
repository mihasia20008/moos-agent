import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import ReactBootstrapSlider from 'react-bootstrap-slider';

class TasksFilter extends PureComponent {
    state = { isDropdownOpen: false };

    changeValue = (event) => console.log(event);

    handleToggleDropdown = ({ target }) => this.setState({ isDropdownOpen: !this.state.isDropdownOpen });

    render() {
        const { isDropdownOpen } = this.state;
        const { isDisable } = this.props;

        return (
            <div className={cx('main-filter')}>
                <div className={cx('main-filter__container')}>
                    <div className={cx('main-filter__content')}>
                        <div className={cx('main-filter__row', {
                            'main-filter__row--disabled': isDisable,
                        })}>
                            <div className={cx('main-filter__control main-filter__control--icon-right')}>
                                <div className={cx('dropdown', {
                                    'show': isDropdownOpen
                                })}>
                                    <button
                                        onClick={this.handleToggleDropdown}
                                        className={cx('btn btn-dropdown dropdown-toggle btn-dropdown--hidden-border')}
                                        type="button"
                                        data-toggle="dropdown"
                                    >
                                        Текущие заявки
                                    </button>
                                    <div className={cx('dropdown-menu', {
                                        'show': isDropdownOpen
                                    })}>
                                        <span className={cx('dropdown-item')}>Все заявки</span>
                                        <span className={cx('dropdown-item')}>Текущие заявки</span>
                                        <span className={cx('dropdown-item')}>Завершенные заявки</span>
                                    </div>
                                </div>
                                <i className={cx('icon icon-chevron-down')} />
                            </div>
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
