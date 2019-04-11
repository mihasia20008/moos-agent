import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import ReactBootstrapSlider from "react-bootstrap-slider";

import { formatNumber } from '../../services/utility';

class RangeSlider extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onEndChanging: PropTypes.func.isRequired,
        defaultActive: PropTypes.shape({
            from: PropTypes.number,
            to: PropTypes.number,
        }),
    };
    static defaultProps = {
        defaultActive: {
            from: 1000000,
            to: 15000000,
        },
    };

    state = {
        wasChange: false,
        from: this.props.defaultActive.from,
        to: this.props.defaultActive.to,
    };

    static getDerivedStateFromProps(props, state) {
        const { from, to, wasChange } = state;
        const { defaultActive } = props;
        if (!wasChange && (defaultActive.from !== from || defaultActive.to !== to)) {
            return {
                wasChange: true,
                from: defaultActive.from,
                to: defaultActive.to,
            }
        }
        return {};
    }

    static difference(val, by) {
        return (val - val % by) / by;
    }

    static getTextPrice(price) {
        const thousandRemainder = RangeSlider.difference(price, 1000);
        if (!thousandRemainder) {
            return price;
        }
        const millionRemainder = RangeSlider.difference(thousandRemainder, 1000);
        if (!millionRemainder) {
            return `${thousandRemainder}К`;
        }
        return `${formatNumber(millionRemainder, false)}М`;
    }

    changeValue = ({ target }) => this.setState({
        from: target.value[0],
        to: target.value[1],
    });

    stopChangingValue = ({ target }) => {
        const { name, onEndChanging } = this.props;

        if (target.value[0] === RangeSlider.defaultProps.defaultActive.from && target.value[1] === RangeSlider.defaultProps.defaultActive.to) {
            onEndChanging(name, ['', '']);
        } else {
            onEndChanging(name, target.value);
        }
    };

    render() {
        const { from, to } = this.state;
        const { defaultActive } = this.props;

        return (
            <div className={cx('filter-slider')}>
                <span>От {RangeSlider.getTextPrice(from)} ₽</span>
                <ReactBootstrapSlider
                    className={cx('filter-slider__control')}
                    value={[from, to]}
                    change={this.changeValue}
                    slideStop={this.stopChangingValue}
                    step={10}
                    max={defaultActive.to}
                    min={defaultActive.from} />
                <span>До {RangeSlider.getTextPrice(to)} ₽</span>
            </div>
        );
    }
}

export default RangeSlider;
