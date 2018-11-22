import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import TasksFilter from '../../containers/Filter/Tasks';
import TasksList from '../../containers/List/Tasks';
import EmptyTasksList from '../../components/Empty/TasksList';

import { getTasksList, getNextTasksPage } from '../../redux/Tasks/actions';

class Tasks extends PureComponent {

    componentDidMount() {
        const { session_id, getTasksList } = this.props;
        console.log(session_id);
        
        if (typeof session_id !== 'undefined') {
            getTasksList(session_id);
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        const {
            session_id,
            list,
            isFetchingNext,
            nextPage,
            hasMorePage,
            getNextTasksPage
        } = this.props;
        const { height } = document.querySelector('.block-list.block-list--tasks').getBoundingClientRect();

        if (!isFetchingNext && list.length > 0 && hasMorePage && height - window.scrollY < 1000) {
            getNextTasksPage(session_id, nextPage);
        }
    }
    
    render() {
        const { list, isFetching, isFetchingNext } = this.props;

        return [
            <Sidebar key={0} />,
            <section key={1} className={cx('fr-content')}>
                <TasksFilter isDisable={!list.length} />
                {!list.length && !isFetching
                    ? <EmptyTasksList />
                    : <TasksList list={list} isLoading={isFetching} isLoadingNext={isFetchingNext} />}
            </section>
        ];
    }
}

const mapStateToProps = ({ Tasks, User }) => {
    return {
        isFetching: Tasks.isFetching,
        isFetchingNext: Tasks.isFetchingNext,
        list: Tasks.order,
        nextPage: Tasks.page + 1,
        hasMorePage: Tasks.more,
        session_id: User.session_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTasksList: (session_id) => dispatch(getTasksList(session_id)),
        getNextTasksPage: (session_id, page) => dispatch(getNextTasksPage(session_id, page)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);
