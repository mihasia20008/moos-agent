import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import { Link } from 'react-router-dom';

const OrderItem = ({ id, task, orderNumber, createdDate, activePhase }) => {
    if (typeof task === 'undefined') {
        return (
            <div className={cx('orders-list__row')}>
                <div className={cx('orders-list__title')}>
                    <span className={cx('orders-list__title-name')}>{orderNumber}</span>
                    <span className={cx('orders-list__title-date')}>от {createdDate}</span>
                </div>
                <span className={cx('badge', {
                    [`badge--${activePhase.status}`]: activePhase.status
                })}>{activePhase.phaseName}</span>
            </div>
        );
    }

    return (
        <Link
            to={{
                pathname: `/tasks/${task.task_id}`,
                state: { title: task.name }
            }}
            className={cx('orders-list__row')}
        >
            <div className={cx('orders-list__title')}>
                <span className={cx('orders-list__title-name')}>{orderNumber}</span>
                <span className={cx('orders-list__title-date')}>от {createdDate}</span>
            </div>
            <span className={cx('badge', {
                [`badge--${activePhase.status}`]: activePhase.status
            })}>{activePhase.phaseName}</span>
        </Link>
    );
};

OrderItem.propTypes = {
    id: PropTypes.string.isRequired,
    task: PropTypes.object,
    orderNumber: PropTypes.string,
    createdDate: PropTypes.string,
    activePhase: PropTypes.object,
};

export default OrderItem;
