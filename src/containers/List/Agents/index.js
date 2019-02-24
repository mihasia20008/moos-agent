import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AgentCard from '../../../components/Card/Agent';
import Skelet from '../../../components/Card/Skelet';

const AgentsList = ({ list, isLoading }) => {
    return (
        <div className={cx('fr-agents-list')}>
            {isLoading
                ? [0, 1, 2, 3].map((item, index) => <Skelet key={index} />)
                : list.map((item, index) => (
                    <AgentCard
                        key={item.id}
                        id={index}
                        name={item.displayName}
                        agentsCount={item.agentLogins ? item.agentLogins.length : 0}
                    />
                ))}
        </div>
    );
};

AgentsList.propTypes = {
    list: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
};

export default AgentsList;
