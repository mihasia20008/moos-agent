import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import AgentsStatsPanel from '../../components/StatsPanel/Agents';
import EmptyAgentsList from "../../components/Empty/AgentsList";
import AgentsList from "../../containers/List/Agents";

import { getAgentsList } from "../../redux/Agents/actions";
import { setClientsFilter } from "../../redux/Clients/actions";

class Agents extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool,
        ids: PropTypes.array,
        list: PropTypes.object,
        rootAgents: PropTypes.array,
        statSummury: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getAgentsList(true));
    }

    handleShowClients = (agentId) => {
        const { history, dispatch } = this.props;
        dispatch(setClientsFilter({ agentCompanyId: agentId }));
        history.push('/clients');
    };

    render() {
        const { isFetching, ids, list, rootAgents, statSummury } = this.props;

        return (
            <section className={cx('fr-content')}>
                <AgentsStatsPanel list={statSummury} />
                {!ids.length && !isFetching
                    ? <EmptyAgentsList />
                    : (
                        <AgentsList
                            list={list}
                            rootAgents={rootAgents}
                            isLoading={isFetching}
                            onShowClients={this.handleShowClients}
                        />
                    )}
            </section>
        );
    }
}

const mapStateToProps = ({ Agents }) => {
    return {
        isFetching: Agents.isFetching,
        ids: Agents.ids,
        list: Agents.list,
        rootAgents: Agents.rootAgents,
        statSummury: Agents.stat,
    }
};

export default connect(mapStateToProps)(Agents);
