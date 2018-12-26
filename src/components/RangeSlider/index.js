import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import ReactBootstrapSlider from "react-bootstrap-slider";

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
            from: 1,
            to: 15000000,
        },
    };

    state = {
        from: this.props.defaultActive.from,
        to: this.props.defaultActive.to,
    };

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
        return `${millionRemainder}М`;
    }

    changeValue = ({ target }) => this.setState({
        from: target.value[0],
        to: target.value[1],
    });

    stopChangingValue = ({ target }) => {
        const { name, onEndChanging } = this.props;
        onEndChanging(name, target.value);
    };

    render() {
        const { from, to } = this.state;

        return (
            <div className={cx('filter-slider')}>
                <span>От {RangeSlider.getTextPrice(from)} ₽</span>
                <ReactBootstrapSlider
                    className={cx('filter-slider__control')}
                    value={[from, to]}
                    change={this.changeValue}
                    slideStop={this.stopChangingValue}
                    step={10}
                    max={RangeSlider.defaultProps.defaultActive.to}
                    min={RangeSlider.defaultProps.defaultActive.from} />
                <span>До {RangeSlider.getTextPrice(to)} ₽</span>
            </div>
        );
    }
}

export default RangeSlider;
