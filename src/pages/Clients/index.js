import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

// import ClientsFilter from '../../containers/Filter/Clients';
import ClientsList from '../../containers/List/Clients';
// import ClientsStatsPanel from '../../components/StatsPanel/Clients';
import EmptyClientsList from '../../components/Empty/ClientsList';

import { getClientsList, getNextClientsList } from '../../redux/Clients/actions';

class Clients extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isFetchingNext: PropTypes.bool.isRequired,
        company: PropTypes.array,
        nextPage: PropTypes.number,
        hasMorePage: PropTypes.bool,
        session_id: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { session_id, dispatch } = this.props;
        
        if (typeof session_id !== 'undefined') {
            dispatch(getClientsList(session_id));
        } 
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        const {
            session_id,
            company,
            isFetchingNext,
            nextPage,
            hasMorePage,
            dispatch,
        } = this.props;
        const { height } = document.querySelector('.block-list.block-list--clients').getBoundingClientRect();

        if (!isFetchingNext && company.length > 0 && hasMorePage && height - window.scrollY < 1000) {
            dispatch(getNextClientsList(session_id, nextPage));
        }
    };
    
    render() {
        const { company, isFetching, isFetchingNext } = this.props;
        // {/*<ClientsStatsPanel key={0} />,*/}

        return (
            <section className={cx('fr-content')}>
                {/*<ClientsFilter isDisable={!company.length} />*/}
                {!company.length && !isFetching
                    ? <EmptyClientsList />
                    : <ClientsList
                        list={company}
                        isLoading={isFetching}
                        isLoadingNext={isFetchingNext}
                    />}
            </section>
        );
    }
}

const mapStateToProps = ({ Clients, User }) => {
    return {
        isFetching: Clients.isFetching,
        isFetchingNext: Clients.isFetchingNext,
        company: Clients.company,
        nextPage: Clients.page + 1,
        hasMorePage: Clients.more,
        session_id: User.session_id,
    };
};

export default connect(mapStateToProps)(Clients);
