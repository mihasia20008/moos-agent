import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import TasksFilter from '../../containers/Filter/Tasks';
import TasksList from '../../containers/List/Tasks';
import EmptyTasksList from '../../components/Empty/TasksList';

import { getTasksList, getNextTasksPage, setTasksFilter } from '../../redux/Tasks/actions';
import { authenticationUser } from "../../redux/User/actions";

class Tasks extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isFetchingNext: PropTypes.bool.isRequired,
        list: PropTypes.array,
        filters: PropTypes.object,
        filterAmount: PropTypes.shape({
            from: PropTypes.number.isRequired,
            to: PropTypes.number.isRequired,
        }).isRequired,
        nextPage: PropTypes.number.isRequired,
        hasMorePage: PropTypes.bool.isRequired,
        processDefinitionKeys: PropTypes.array.isRequired,
        session_id: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { session_id, filters, dispatch } = this.props;

        if (typeof session_id !== 'undefined') {
            dispatch(getTasksList(session_id, filters));
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        const { session_id, filters, dispatch } = this.props;
        if (JSON.stringify(filters) !== JSON.stringify(nextProps.filters)) {
            dispatch(getTasksList(session_id, nextProps.filters));
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
            dispatch
        } = this.props;
        const { height } = document.querySelector('.block-list.block-list--tasks').getBoundingClientRect();

        if (!isFetchingNext && list.length > 0 && hasMorePage && height - window.scrollY < 1000) {
            dispatch(getNextTasksPage(session_id, nextPage, filters));
        }
    };

    handleChangeFilter = (name, value) => {
        const { dispatch } = this.props;
        dispatch(setTasksFilter(name, value));
    };

    handleOpenDetail = (taskId, taskName) => {
        const { session_id, history, dispatch } = this.props;
        dispatch(authenticationUser(session_id, true))
            .then(() => history.push(`/tasks/${taskId}`, {
                title: taskName
            }))
            .catch(err => console.log(err));
    };
    
    render() {
        const {
            list,
            filters,
            filterAmount,
            processDefinitionKeys,
            isFetching,
            isFetchingNext,
        } = this.props;

        return (
            <section className={cx('fr-content')}>
                <TasksFilter
                    isDisable={!list.length && !Object.keys(filters).length}
                    filters={filters}
                    filterAmount={filterAmount}
                    processes={processDefinitionKeys}
                    onChangeFilter={this.handleChangeFilter}
                />
                {!list.length && !isFetching
                    ? <EmptyTasksList />
                    : (
                        <TasksList
                            list={list}
                            isLoading={isFetching}
                            isLoadingNext={isFetchingNext}
                            onOpenDetail={this.handleOpenDetail}
                        />
                    )}
            </section>
        );
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
        filterAmount: {
            from: Tasks.amount_min,
            to: Tasks.amount_max,
        },
        session_id: User.session_id,
    };
};

export default connect(mapStateToProps)(Tasks);
