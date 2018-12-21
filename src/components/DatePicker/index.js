import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { DateRange } from 'react-date-range';
import { ru } from 'react-date-range/dist/locale';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

class DatePicker extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        defaultActive: PropTypes.shape({
            from: PropTypes.date,
            to: PropTypes.date,
        }),
        onSelectDate: PropTypes.func.isRequired,
    };
    static defaultProps = {
        defaultActive: {
            from: new Date(),
            to: new Date(),
        },
    };

    state = {
        showPicker: false,
        selectCount: 0,
        startDate: this.props.defaultActive.from,
        endDate: this.props.defaultActive.to,
    };

    static prepareInputValue(stateFrom, stateTo, propsFrom, propsTo) {
        if (stateFrom !== propsFrom && stateFrom === stateTo) {
            return `${DatePicker.convertDateValue(stateFrom)}/`;
        }
        if (stateFrom !== propsFrom && stateTo !== propsTo) {
            return `${DatePicker.convertDateValue(stateFrom)}/${DatePicker.convertDateValue(stateTo)}`;
        }
        return '';
    }

    static convertDateValue(value) {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}.${date.getFullYear()}`
    }

    handleSelect = (ranges) => {
        const { name } = this.props;
        const values = ranges[name];
        this.setState({
            startDate: values.startDate,
            endDate: values.endDate,
            selectCount: this.state.selectCount + 1,
        }, this.checkEndSelectDate);
    };

    checkEndSelectDate = () => {
        const { selectCount } = this.state;
        if (selectCount === 2) {
            this.handleEndSelect();
        }
    };

    handleEndSelect = () => {
        this.handleTogglePicker();
        this.props.onSelectDate({ target: this.input });
    };

    handleTogglePicker = () => {
        const { showPicker } = this.state;
        if (showPicker) {
            document.removeEventListener('click', this.handleOutsideClick, false);
        } else {
            document.addEventListener('click', this.handleOutsideClick, false);
        }
        this.setState({ showPicker: !showPicker, selectCount: 0 });
    };

    handleOutsideClick = (event) => {
        if (this.picker && this.picker.contains(event.target)) return;
        this.handleEndSelect();
    };

    handleNativeType = () => ({});

    render() {

        const { showPicker, startDate, endDate } = this.state;
        const { name, defaultActive } = this.props;

        const value = DatePicker.prepareInputValue(startDate, endDate, defaultActive.from, defaultActive.to);
        const range = {
            key: name,
            startDate,
            endDate
        };

        return (
            <div
                className={cx('main-filter__picker-wrap')}
                ref={node => { this.picker = node; }}
            >
                <div className={cx('main-filter__control main-filter__control--icon-left')}>
                    <i className={cx('icon icon-calendar')}/>
                    <input
                        ref={node => { this.input = node; }}
                        type="text"
                        className={cx('main-filter__control-field', {
                            'main-filter__control-field--active': showPicker
                        })}
                        name={name}
                        value={value}
                        placeholder="Даты"
                        onChange={this.handleNativeType}
                        onFocus={this.handleTogglePicker}
                    />
                </div>
                <div className={cx('main-filter__picker', {
                    'main-filter__picker--show': showPicker,
                })}>
                    <DateRange
                        locale={ru}
                        ranges={[range]}
                        moveRangeOnFirstSelection={false}
                        onChange={this.handleSelect}
                    />
                </div>
            </div>
        );
    }
};

export default DatePicker;
