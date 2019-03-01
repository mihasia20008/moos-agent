import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

import StatsInfoItem from '../StatsInfoItem';

import CONTENT from '../../contentConstants';

const StatsInfoBlock = ({ globalColor, infoBlock, indicator }) => {
    const { statusItems } = CONTENT;
    return (
        <div className={cx('chart-stats__info')}>{
            statusItems.map(({ key, text, className }, index) => {
                const subItemKey = indicator === 'count' ? 'amount' : 'count';
                return (typeof infoBlock.items[key] !== 'undefined')
                    ? (
                        <StatsInfoItem
                            key={index}
                            progressColor={globalColor || className}
                            mainCount={infoBlock.items[key][`${indicator}`]}
                            subCount={infoBlock.items[key][`${subItemKey}`]}
                            sum={infoBlock[`${indicator}Sum`]}
                            badge={infoBlock.items[key][`${indicator}_change`]}
                            text={text}
                            mainKey={indicator}
                        />
                    ) : null;
            })
        }</div>
    );
};

StatsInfoBlock.propTypes = {
    infoBlock: PropTypes.shape({
        items: PropTypes.object.isRequired,
        countSum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        amountSum: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        noItems: PropTypes.bool.isRequired,
    }).isRequired,
    indicator: PropTypes.string.isRequired,
    globalColor: PropTypes.string,
};

StatsInfoBlock.defaultProps = {
    globalColor: '',
};

export default StatsInfoBlock;
