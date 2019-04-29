import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import ClientsFilter from '../../containers/Filter/Clients';
import ClientsList from '../../containers/List/Clients';
import ClientsStatsPanel from '../../components/StatsPanel/Clients';
import EmptyClientsList from '../../components/Empty/ClientsList';

import { getClientsList, getNextClientsList, setClientsFilter, clearAllFilters } from '../../redux/Clients/actions';
import { getAgentsList } from "../../redux/Agents/actions";

class Clients extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isFetchingNext: PropTypes.bool.isRequired,
        agents: PropTypes.array,
        company: PropTypes.array,
        filters: PropTypes.object,
        clientsCount: PropTypes.number,
        nextPage: PropTypes.number,
        hasMorePage: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { isManager, filters, dispatch } = this.props;
        dispatch(getClientsList(filters));
        if (isManager) {
            dispatch(getAgentsList());
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        const { filters, dispatch } = this.props;
        if (JSON.stringify(filters) !== JSON.stringify(nextProps.filters)) {
            dispatch(getClientsList(nextProps.filters));
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(clearAllFilters());
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        const {
            company,
            isFetchingNext,
            filters,
            nextPage,
            hasMorePage,
            dispatch,
        } = this.props;
        const container = document.querySelector('.block-list.block-list--clients');
        if (!container) {
            return null;
        }

        const { height } = container.getBoundingClientRect();

        if (!isFetchingNext && company.length > 0 && hasMorePage && height - window.scrollY < 1000) {
            dispatch(getNextClientsList(nextPage, filters));
        }
    };

    handleChangeFilter = (filters) => {
        const { dispatch } = this.props;
        dispatch(setClientsFilter(filters));
    };
    
    render() {
        const { agents, company, stat, isManager, isFetching, isFetchingNext, filters } = this.props;

        return (
            <section className={cx('fr-content fr-content--clients')}>
                <ClientsFilter
                    isDisable={!company.length && !Object.keys(filters).length}
                    agents={agents}
                    filters={filters}
                    isManager={isManager}
                    onChangeFilter={this.handleChangeFilter}
                />
                {!company.length && !isFetching
                    ? <EmptyClientsList />
                    : [
                        <ClientsStatsPanel
                            key={0}
                            companiesStat={stat.company}
                        />,
                        <ClientsList
                            key={1}
                            list={company}
                            isLoading={isFetching}
                            isLoadingNext={isFetchingNext}
                        />,
                    ]}
            </section>
        );
    }
}

const mapStateToProps = ({ Agents, Clients, User }) => {
    return {
        isManager: User.ismanager,
        isFetching: Clients.isFetching,
        isFetchingNext: Clients.isFetchingNext,
        company: Clients.company,
        filters: Clients.filters,
        stat: Clients.stat,
        nextPage: Clients.page + 1,
        hasMorePage: Clients.more,
        agents: Agents.agents,
    };
};

export default connect(mapStateToProps)(Clients);
