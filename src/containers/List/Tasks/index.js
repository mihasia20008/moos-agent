import React from 'react';
import cx from 'classnames';

import TaskCard from '../../../components/Card/Task';
import SkeketTask from '../../../components/Card/SkeletTask';

const TasksList = ({ list, isLoading, isLoadingNext }) => {
    return (
        <div className={cx('block-list block-list--tasks')}>
            {isLoading
                ? [0, 1, 2, 3].map((item, index) => <SkeketTask key={index} />)
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
                    />
                ))}
            {isLoadingNext && <SkeketTask key={list.length + 10} showLoader />}
        </div>
    );
};

export default TasksList;
