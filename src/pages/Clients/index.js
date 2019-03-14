import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import ClientsFilter from '../../containers/Filter/Clients';
import ClientsList from '../../containers/List/Clients';
import ClientsStatsPanel from '../../components/StatsPanel/Clients';
import EmptyClientsList from '../../components/Empty/ClientsList';

import { getClientsList, getNextClientsList, setClientsFilter, clearAllFilters } from '../../redux/Clients/actions';

class Clients extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isFetchingNext: PropTypes.bool.isRequired,
        company: PropTypes.array,
        filters: PropTypes.object,
        clientsCount: PropTypes.number,
        nextPage: PropTypes.number,
        hasMorePage: PropTypes.bool,
        session_id: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { session_id, filters, dispatch } = this.props;
        
        if (typeof session_id !== 'undefined') {
            dispatch(getClientsList(session_id, filters));
        } 
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        const { session_id, filters, dispatch } = this.props;
        if (JSON.stringify(filters) !== JSON.stringify(nextProps.filters)) {
            dispatch(getClientsList(session_id, nextProps.filters));
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(clearAllFilters());
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        const {
            session_id,
            company,
            isFetchingNext,
            filters,
            nextPage,
            hasMorePage,
            dispatch,
        } = this.props;
        const { height } = document.querySelector('.block-list.block-list--clients').getBoundingClientRect();

        if (!isFetchingNext && company.length > 0 && hasMorePage && height - window.scrollY < 1000) {
            dispatch(getNextClientsList(session_id, nextPage, filters));
        }
    };

    handleChangeFilter = (filters) => {
        const { dispatch } = this.props;
        dispatch(setClientsFilter(filters));
    };
    
    render() {
        const { company, clientsCount, isFetching, isFetchingNext, filters } = this.props;

        return (
            <section className={cx('fr-content fr-content--with-filter')}>
                <ClientsFilter
                    isDisable={!company.length && !Object.keys(filters).length}
                    filters={filters}
                    onChangeFilter={this.handleChangeFilter}
                />
                {!company.length && !isFetching
                    ? <EmptyClientsList />
                    : [
                        <ClientsStatsPanel
                            key={0}
                            clientsCount={clientsCount}
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

const mapStateToProps = ({ Clients, User }) => {
    return {
        isFetching: Clients.isFetching,
        isFetchingNext: Clients.isFetchingNext,
        company: Clients.company,
        filters: Clients.filters,
        clientsCount: Clients.total,
        nextPage: Clients.page + 1,
        hasMorePage: Clients.more,
        session_id: User.session_id,
    };
};

export default connect(mapStateToProps)(Clients);
