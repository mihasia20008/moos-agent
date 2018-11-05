import React from 'react';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import TasksFilter from '../../containers/Filter/Tasks';
import TasksList from '../../containers/List/Tasks';

const Tasks = () => {
    return [
        <Sidebar key={0} />,
        <section key={1} className={cx('fr-content')}>
            <TasksFilter />
            <TasksList />
        </section>
    ];
};

export default Tasks;
