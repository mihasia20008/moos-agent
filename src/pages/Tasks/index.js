import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import TasksFilter from '../../containers/Filter/Tasks';
import TasksList from '../../containers/List/Tasks';
import EmptyTasksList from '../../components/Empty/TasksList';

import { getTasksList } from '../../redux/Tasks/actions';

class Tasks extends PureComponent {

    // componentDidMount = () => {
    //   this.props.getTasksList();
    // }

    enebleLoading = () => this.props.getTasksList();
    
    render() {
        const { list, isFetching } = this.props;

        return [
            <Sidebar key={0} />,
            <section key={1} className={cx('fr-content')}>
                <TasksFilter isDisable={!list.length} />
                {!list.length && !isFetching
                    ? <EmptyTasksList />
                    : <TasksList list={list} isLoading={isFetching} />}
            </section>,
            <button key={2} onClick={this.enebleLoading} style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>Начать загрузку</button>
        ];
    }
}

const mapStateToProps = ({ Tasks }) => {
    return {
        isFetching: Tasks.isFetching, 
        list: Tasks.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTasksList: () => dispatch(getTasksList()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);
