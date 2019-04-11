import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AgentCard from '../../../components/Card/Agent';
import Skelet from '../../../components/Card/Skelet';

class AgentsList extends PureComponent {
    static propTypes = {
        rootAgents: PropTypes.array.isRequired,
        list: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        onShowClients: PropTypes.func.isRequired,
    };

    renderSkeleton = () => {
        return (
            <div className={cx('fr-agents-list')}>
                {[0, 1, 2, 3].map((item, index) => <Skelet key={index} />)}
            </div>
        );
    };

    renderCard = (item, level) => {
        const { list, onShowClients } = this.props;

        return (
            <Fragment>
                <AgentCard
                    key={item.id}
                    id={item.id}
                    level={level}
                    name={item.displayName}
                    inn={item.INN}
                    statList={item.stat}
                    agentsCount={item.agentLogins ? item.agentLogins.length : 0}
                    companyCount={item.company_count}
                    onShowClients={onShowClients}
                />
                {item.children.map(id => this.renderCard(list[id], level + 1))}
            </Fragment>
        );
    };

    render() {
        const { list, rootAgents, isLoading } = this.props;

        if (isLoading) {
            this.renderSkeleton();
        }

        return (
            <div className={cx('fr-agents-list')}>
                {rootAgents.map(id => this.renderCard(list[id], 0))}
            </div>
        );
    }
}

export default AgentsList;
