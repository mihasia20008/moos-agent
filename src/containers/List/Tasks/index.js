import React, { PureComponent } from 'react';
import cx from 'classnames';

import TaskCard from '../../../components/Card/Task';

const list = [0, 1, 2, 3];

class TasksList extends PureComponent {
    render() {
        return (
            <div className={cx('block-list block-list--tasks')}>{
                list.map((item, index) => <TaskCard key={index} />)
            }</div>
        );
    }
}

export default TasksList;
