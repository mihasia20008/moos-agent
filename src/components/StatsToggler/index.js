import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

class StatIndicator extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    handleClick = () => {
        const { name, onClick } = this.props;
        onClick(name);
    };

    render() {
        const { text, isActive } = this.props;
        return (
            <button
                type="button"
                className={cx('chart-stats__filter-item', {
                    'chart-stats__filter-item--active': isActive,
                })}
                onClick={this.handleClick}
            >
                {text}
            </button>
        );
    }
}

export default StatIndicator;
