import React from 'react';
import cx from 'classnames';

import StatItem from '../StatItem';

const AgentStats = ({ items, statusItems }) => {
    const sum = statusItems.reduce((acc, { key }) => {
        return typeof items[key] === 'undefined'
            ? acc
            : acc + items[key].count;
    }, 0);

    if (!sum) {
        return null;
    }

    return (
        <div className={cx('fr-agent-card__footer')}>{
            statusItems.map(({ key, text, className }) => {
                return (typeof items[key] !== 'undefined' && items[key].count)
                    ? (
                        <StatItem
                            key={key}
                            text={text}
                            count={items[key].count}
                            amount={items[key].amount}
                            sum={sum}
                            progressColor={className}
                        />
                    ) : null;
            })
        }</div>
    );
};

AgentStats.defaultProps = { statusItems: [] };

export default AgentStats;
