import React from 'react';
import cx from 'classnames';

import TaskCard from '../../../components/Card/Task';
import SkeketTask from '../../../components/Card/SkeletTask';

const TasksList = ({ list, isLoading }) => {
    return (
        <div className={cx('block-list block-list--tasks')}>
            {isLoading
                ? [0, 1, 2, 3].map((item, index) => <SkeketTask key={index} />)
                : list.map((item, index) => <TaskCard key={index} />) }
        </div>
    );
};

export default TasksList;
