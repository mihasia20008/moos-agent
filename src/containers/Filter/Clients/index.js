import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import ReactBootstrapSlider from 'react-bootstrap-slider';

class ClientsFilter extends PureComponent {
    state = { isFixed: false };

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
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
    }

    changeValue = (event) => console.log(event);

    render() {
        const { isFixed } = this.state;

        return (
            <div className={cx('main-filter main-filter--fixed-width', {
                'main-filter--fixed': isFixed,
            })}>
                <div className={cx('main-filter__container')}>
                    <div className={cx('main-filter__content')}>
                        <div className={cx('main-filter__row')}>
                            <div className={cx('main-filter__control main-filter__control--icon-right')}>
                                <div className={cx('dropdown')}>
                                    <button type="button" className={cx('btn btn-dropdown dropdown-toggle')} data-toggle="dropdown">
                                        Индивидуальные предприятия
                                    </button>
                                    <div className={cx('dropdown-menu')}>
                                        <span className={cx('dropdown-item')}>Предприятие 1</span>
                                        <span className={cx('dropdown-item')}>Предприятие 2</span>
                                        <span className={cx('dropdown-item')}>Предприятие 3</span>
                                    </div>
                                </div>
                                <i className={cx('icon icon-chevron-down')} />
                            </div>
                            <div className={cx('main-filter__control main-filter__control--icon-right')}>
                                <div className={cx('dropdown')}>
                                    <button type="button" className={cx('btn btn-dropdown dropdown-toggle')} data-toggle="dropdown">
                                        Я→А
                                    </button>
                                    <div className={cx('dropdown-menu')}>
                                        <span className={cx('dropdown-item')}>А→Я</span>
                                        <span className={cx('dropdown-item')}>Я→А</span>
                                    </div>
                                </div>
                                <i className={cx('icon icon-chevron-down')} />
                            </div>
                            <div className={cx('main-filter__control main-filter__control--icon-right')}>
                                <div className={cx('dropdown')}>
                                    <button type="button" className={cx('btn btn-dropdown dropdown-toggle')} data-toggle="dropdown">
                                        По дате последнего платежа
                                    </button>
                                    <div className={cx('dropdown-menu')}>
                                        <span className={cx('dropdown-item')}>По дате последнего платежа 1</span>
                                        <span className={cx('dropdown-item')}>По дате последнего платежа 2</span>
                                        <span className={cx('dropdown-item')}>По дате последнего платежа 3</span>
                                    </div>
                                </div>
                                <i className={cx('icon icon-chevron-down')} />
                            </div>
                            <div className={cx('main-filter__control main-filter__control--button')}>
                                <Link className={cx('btn btn-search')} to="?search">
                                    <i className={cx('icon icon-seacrh-m')} />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('main-filter__row')}>
                            <div className={cx('filter-slider filter-slider--full-size')}>
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

export default ClientsFilter;
