import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import TasksFilter from '../../containers/Filter/Tasks';
import TasksList from '../../containers/List/Tasks';
import EmptyTasksList from '../../components/Empty/TasksList';

import { getTasksList, getNextTasksPage, setTasksFilter } from '../../redux/Tasks/actions';

class Tasks extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isFetchingNext: PropTypes.bool.isRequired,
        list: PropTypes.array,
        filters: PropTypes.object,
        nextPage: PropTypes.number.isRequired,
        hasMorePage: PropTypes.bool.isRequired,
        processDefinitionKeys: PropTypes.array.isRequired,
        session_id: PropTypes.string.isRequired,
        getTasksList: PropTypes.func.isRequired,
        getNextTasksPage: PropTypes.func.isRequired,
        setTasksFilter: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { session_id, getTasksList, filters } = this.props;

        if (typeof session_id !== 'undefined') {
            getTasksList(session_id, filters);
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        const { session_id, getTasksList, filters } = this.props;
        if (JSON.stringify(filters) !== JSON.stringify(nextProps.filters)) {
            getTasksList(session_id, nextProps.filters);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        const {
            session_id,
            list,
            filters,
            isFetchingNext,
            nextPage,
            hasMorePage,
            getNextTasksPage
        } = this.props;
        const { height } = document.querySelector('.block-list.block-list--tasks').getBoundingClientRect();

        if (!isFetchingNext && list.length > 0 && hasMorePage && height - window.scrollY < 1000) {
            getNextTasksPage(session_id, nextPage, filters);
        }
    };
    
    render() {
        const { list, filters, processDefinitionKeys, isFetching, isFetchingNext, setTasksFilter } = this.props;

        return [
            <Sidebar key={0} />,
            <section key={1} className={cx('fr-content')}>
                <TasksFilter
                    isDisable={!list.length && !Object.keys(filters).length}
                    filters={filters}
                    processes={processDefinitionKeys}
                    onChangeFilter={setTasksFilter}
                />
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
        filters: Tasks.filters,
        nextPage: Tasks.page + 1,
        hasMorePage: Tasks.more,
        processDefinitionKeys: User.processDefinitionKeys,
        session_id: User.session_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTasksList: (session_id, filters) => dispatch(getTasksList(session_id, filters)),
        getNextTasksPage: (session_id, page, filters) => dispatch(getNextTasksPage(session_id, page, filters)),
        setTasksFilter: (name, value) => dispatch(setTasksFilter(name, value)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);
