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
        agents: PropTypes.array,
        statSummury: PropTypes.object,
        session_id: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    };

    componentDidMount() {
        const { session_id, dispatch } = this.props;

        if (typeof session_id !== 'undefined') {
            dispatch(getAgentsList(session_id));
        }
    }

    handleShowClients = (agentId) => {
        const { history, dispatch } = this.props;
        dispatch(setClientsFilter({ agentCompanyId: agentId }));
        history.push('/clients');
    };

    render() {
        const { isFetching, agents, statSummury } = this.props;

        return (
            <section className={cx('fr-content')}>
                <AgentsStatsPanel list={statSummury} />
                {!agents.length && !isFetching
                    ? <EmptyAgentsList />
                    : (
                        <AgentsList
                            list={agents}
                            isLoading={isFetching}
                            onShowClients={this.handleShowClients}
                        />
                    )}
            </section>
        );
    }
}

const mapStateToProps = ({ Agents, User }) => {
    return {
        isFetching: Agents.isFetching,
        agents: Agents.agents,
        statSummury: Agents.stat,
        session_id: User.session_id,
    }
};

export default connect(mapStateToProps)(Agents);
