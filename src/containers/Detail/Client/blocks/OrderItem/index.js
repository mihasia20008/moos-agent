import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

class OrderItem extends PureComponent {
    static propTypes = {
        task: PropTypes.object,
        orderNumber: PropTypes.string,
        createdDate: PropTypes.string,
        activePhase: PropTypes.object,
        onOpenTaskDetail: PropTypes.func.isRequired,
    };

    handleClickTaskButton = () => {
        const { task, onOpenTaskDetail } = this.props;
        onOpenTaskDetail(task.task_id, task.name);
    };

    render() {
        const { task, orderNumber, createdDate, activePhase } = this.props;

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
            <button
                type="button"
                className={cx('orders-list__row')}
                onClick={this.handleClickTaskButton}
            >
                <div className={cx('orders-list__title')}>
                    <span className={cx('orders-list__title-name')}>{orderNumber}</span>
                    <span className={cx('orders-list__title-date')}>от {createdDate}</span>
                </div>
                <span className={cx('badge', {
                    [`badge--${activePhase.status}`]: activePhase.status
                })}>{activePhase.phaseName}</span>
            </button>
        );
    }
}

export default OrderItem;
