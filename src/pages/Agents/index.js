import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import AgentsStatsPanel from '../../components/StatsPanel/Agents';

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
        console.log(this.props.agents);
        return (
            <section className={cx('fr-content')}>
                <AgentsStatsPanel />
                Agent
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
