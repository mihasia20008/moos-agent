import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TaskCard from '../../../components/Card/Task';
import Skelet from '../../../components/Card/Skelet';

const TasksList = ({ list, isLoading, isLoadingNext, onOpenDetail }) => {
    return (
        <div className={cx('block-list block-list--tasks')}>
            {isLoading
                ? [0, 1, 2, 3].map((item, index) => <Skelet key={index} />)
                : list.map((item, index) => (
                    <TaskCard
                        key={index}
                        orderNumber={item.orderNumber}
                        createdDate={item.createdDate}
                        durationDays={item.durationDays}
                        principalCompany_displayName={item.principalCompany_displayName}
                        principalCompany_INN={item.principalCompany_INN}
                        purchaseAmount={item.purchaseAmount}
                        contract_max_price={item.contract_max_price}
                        daysToStart={item.daysToStart}
                        phases={item.phases}
                        tasks={item.tasks || []}
                        onOpenDetail={onOpenDetail}
                    />
                ))}
            {isLoadingNext && <Skelet key={list.length + 10} showLoader />}
        </div>
    );
};

TasksList.propTypes = {
    list: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    isLoadingNext: PropTypes.bool.isRequired,
    onOpenDetail: PropTypes.func.isRequired
};

export default TasksList;
