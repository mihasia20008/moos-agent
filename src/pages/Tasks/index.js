import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import TasksFilter from '../../containers/Filter/Tasks';
import TasksList from '../../containers/List/Tasks';
import EmptyTasksList from '../../components/Empty/TasksList';

import { getTasksList, getNextTasksPage } from '../../redux/Tasks/actions';

class Tasks extends PureComponent {

    // componentDidMount = () => {
    //   this.props.getTasksList();
    // }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        const { list, isFetchingNext, getNextTasksPage } = this.props;
        const { height } = document.querySelector('.block-list.block-list--tasks').getBoundingClientRect();

        if (!isFetchingNext && list.length > 0 && height - window.scrollY < 1000) {
            getNextTasksPage();
        }
    }

    enebleLoading = () => this.props.getTasksList();
    
    render() {
        const { list, isFetching, isFetchingNext } = this.props;

        return [
            <Sidebar key={0} />,
            <section key={1} className={cx('fr-content')}>
                <TasksFilter isDisable={!list.length} />
                {!list.length && !isFetching
                    ? <EmptyTasksList />
                    : <TasksList list={list} isLoading={isFetching} isLoadingNext={isFetchingNext} />}
            </section>,
            <button key={2} onClick={this.enebleLoading} style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>Начать загрузку</button>
        ];
    }
}

const mapStateToProps = ({ Tasks, User }) => {
    return {
        isFetching: Tasks.isFetching,
        isFetchingNext: Tasks.isFetchingNext,
        list: Tasks.list,
        session_id: User.session_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTasksList: () => dispatch(getTasksList()),
        getNextTasksPage: () => dispatch(getNextTasksPage()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);
