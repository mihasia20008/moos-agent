import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import AgentsStatsPanel from '../../components/StatsPanel/Agents';
import EmptyAgentsList from "../../components/Empty/AgentsList";
import AgentsList from "../../containers/List/Agents";

import { getAgentsList } from "../../redux/Agents/actions";

class Agents extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool,
        agents: PropTypes.array,
        session_id: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { session_id, dispatch } = this.props;

        if (typeof session_id !== 'undefined') {
            dispatch(getAgentsList(session_id));
        }
    }

    render() {
        const { isFetching, agents } = this.props;

        return (
            <section className={cx('fr-content')}>
                <AgentsStatsPanel list={agents} />
                {!agents.length && !isFetching
                    ? <EmptyAgentsList />
                    : (
                        <AgentsList
                            list={agents}
                            isLoading={isFetching}
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
        session_id: User.session_id,
    }
};

export default connect(mapStateToProps)(Agents);
