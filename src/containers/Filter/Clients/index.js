import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import TextField from '../../../components/TextField';

class ClientsFilter extends PureComponent {
    static propTypes = {
        isDisable: PropTypes.bool,
        filters: PropTypes.object,
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

    handleScroll = () => {
        if (!this.state.isFixed && window.scrollY > 0) {
            this.setState({ isFixed: true });
            return;
        }
        if (this.state.isFixed && window.scrollY === 0) {
            this.setState({ isFixed: false });
        }
    };

    handleTypeText = ({ target }) => this.props.onChangeFilter({ [`${target.name}`]: target.value });

    handleClearField = (name, value) => this.props.onChangeFilter({ [`${name}`]: value });

    render() {
        const { isFixed } = this.state;
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
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientsFilter;
