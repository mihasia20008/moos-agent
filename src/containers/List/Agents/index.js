import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AgentCard from '../../../components/Card/Agent';
import Skelet from '../../../components/Card/Skelet';

const AgentsList = ({ list, isLoading, onShowClients }) => {
    return (
        <div className={cx('fr-agents-list')}>
            {isLoading
                ? [0, 1, 2, 3].map((item, index) => <Skelet key={index} />)
                : list.map(item => (
                    <AgentCard
                        key={item.id}
                        id={item.id}
                        name={item.displayName}
                        inn={item.INN}
                        statList={item.stat}
                        agentsCount={item.agentLogins ? item.agentLogins.length : 0}
                        companyCount={item.company_count}
                        onShowClients={onShowClients}
                    />
                ))}
        </div>
    );
};

AgentsList.propTypes = {
    list: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    onShowClients: PropTypes.func.isRequired,
};

export default AgentsList;
