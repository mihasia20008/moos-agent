import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import ClientsFilter from '../../containers/Filter/Clients';
import ClientsList from '../../containers/List/Clients';
import ClientsStats from '../../components/ClientsStats';
import EmptyClientsList from '../../components/Empty/ClientsList';

import { getClientsList } from '../../redux/Clients/actions';

class Clients extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isFetchingNext: PropTypes.bool.isRequired,
        list: PropTypes.object,
        idsList: PropTypes.array,
        session_id: PropTypes.string.isRequired,
        getClientsList: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { session_id, getClientsList } = this.props;
        
        if (typeof session_id !== 'undefined') {
            getClientsList(session_id);
        } 
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        // const { list, isFetchingNext, getNextTasksPage } = this.props;
        // const { height } = document.querySelector('.block-list.block-list--tasks').getBoundingClientRect();

        // if (!isFetchingNext && list.length > 0 && height - window.scrollY < 1000) {
        //     getNextTasksPage();
        // }
    }
    
    render() {
        const { idsList, list, isFetching, isFetchingNext } = this.props;

        return [
            <Sidebar key={0} />,
            <section key={1} className={cx('fr-content')}>
                <ClientsFilter isDisable={!idsList.length} />
                {!idsList.length && !isFetching
                    ? <EmptyClientsList />
                    : [
                        <ClientsStats key={0} />,
                        <ClientsList
                            key={1}
                            idsList={idsList}
                            list={list}
                            isLoading={isFetching}
                            isLoadingNext={isFetchingNext}
                        />
                    ]}
            </section>
        ];
    }
}

const mapStateToProps = ({ Clients, User }) => {
    return {
        isFetching: Clients.isFetching,
        isFetchingNext: Clients.isFetchingNext,
        list: Clients.list,
        idsList: Clients.idsList,
        session_id: User.session_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClientsList: (session_id) => dispatch(getClientsList(session_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Clients);
