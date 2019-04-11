import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { declOfNum } from '../../../services/utility';

import CONTENT from '../../../contentConstants';

class TaskCard extends PureComponent {
    static propTypes = {
        orderNumber: PropTypes.string.isRequired,
        createdDate: PropTypes.string,
        durationDays: PropTypes.number,
        principalCompany_displayName: PropTypes.string,
        principalCompany_INN: PropTypes.string,
        purchaseAmount: PropTypes.string,
        contract_max_price: PropTypes.string,
        daysToStart: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        phases: PropTypes.array,
        status: PropTypes.string,
        tasks: PropTypes.array,
        onOpenDetail: PropTypes.func.isRequired,
    };

    static defaultProps = {
        principalCompany_INN: '&mdash;',
        purchaseAmount: '&mdash;',
        contract_max_price: '&mdash;',
        phases: [],
        status: '',
    };

    static days = ['день', 'дня', 'дней'];

    handleShowTaskDetail = ({ target }) => {
        const { taskId, taskName } = target.dataset;
        const { onOpenDetail } = this.props;
        onOpenDetail(taskId, taskName);
    };

    renderPhases() {
        const { phases } = this.props;
        const phasesText = [
            'Подача заявки',
            'Рассмотрение заявки',
            'Согласование документов',
            'Выдача гарантии'
        ];

        const phasesCount = phases.length;
        const disabledPhases = 4 - phasesCount;

        if (!phasesCount) {
            return null;
        }

        return (
            <div className={cx('stages-progress')}>
                {phases.map((phase, index) => (
                    <div
                        key={phase.phaseId}
                        className={cx('stages-progress__item', {
                            'stages-progress__item--confirmed': index < phasesCount - 1,
                            'stages-progress__item--active': index === phasesCount - 1,
                            [`stages-progress__item--${phase.status}`]: true
                        })}
                    >
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>
                                {phase.phaseName}
                            </span>
                    </div>
                ))}
                {Array.from({length: disabledPhases}, (v, i) => i).map(item => (
                    <div
                        key={item}
                        className={cx('stages-progress__item stages-progress__item--disabled')}
                    >
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>
                            {phasesText[phasesCount + item]}
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    renderStatus() {
        const { status } = this.props;

        if (!status) {
            return null;
        }

        const { statusItems } = CONTENT;
        let renderPastStatuses = true;

        return (
            <div className={cx('stages-progress')}>
                {statusItems.map(({ key, className, text }) => {
                    if (key === 'total') {
                        return null;
                    }
                    const isCurrentStatus = key === status;
                    const item = (
                        <div
                            key={key}
                            className={cx('stages-progress__item', {
                                'stages-progress__item--disabled': !renderPastStatuses,
                                'stages-progress__item--confirmed': renderPastStatuses && !isCurrentStatus,
                                'stages-progress__item--active': isCurrentStatus,
                                [`stages-progress__item--${className}`]: className
                            })}
                            title={text}
                        >
                            <i className={cx('stages-progress__icon icon icon-ok')} />
                            <span className={cx('stages-progress__text')}>
                                {text}
                            </span>
                        </div>
                    );

                    if (renderPastStatuses) {
                        renderPastStatuses = !isCurrentStatus;
                    }

                    return item;
                })}
            </div>
        );

    }

    renderDaysToStart() {
        const { daysToStart } = this.props;

        if (daysToStart) {
            return (
                <div className={cx('block-list__posted-time')}>
                    <span>{daysToStart} {declOfNum(daysToStart, TaskCard.days)}</span>
                </div>
            );
        }

        return null;
    }

    render() {
        const {
            orderNumber,
            createdDate,
            durationDays,
            principalCompany_displayName,
            principalCompany_INN,
            purchaseAmount,
            contract_max_price,
            tasks,
        } = this.props;

        // const phasesBlock = this.renderPhases();
        const daysToStartBlock = this.renderDaysToStart();
        const statusBlock = this.renderStatus();

        return (
            <div className={cx('block-list__item')}>
                {statusBlock || daysToStartBlock ? (
                    <div className={cx('block-list__row')}>
                        {statusBlock}
                        {daysToStartBlock}
                    </div>
                ) : null}
                <div className={cx('block-list__row')}>
                    <div>
                        <div className={cx('block-list__info block-list__info--with-icon')}>
                            <span className={cx('icon icon-user')} />
                            <span>{principalCompany_displayName}</span>
                        </div>
                        <div className={cx('block-list__info')}>ИНН: {principalCompany_INN}</div>
                    </div>
                    <div>
                        <table className={cx('table block-list__table')}>
                            <tbody>
                            <tr>
                                <th>Срок БГ</th>
                                <th>НМЦ закупки</th>
                                <th>Сумма гарантии</th>
                            </tr>
                            <tr>
                                <td>{durationDays} {declOfNum(durationDays, TaskCard.days)}</td>
                                <td>{purchaseAmount} ₽</td>
                                <td>{contract_max_price} ₽</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={cx('block-list__row')}>
                    <div className={cx('block-list__desc')}>
                        <span>{orderNumber}</span>
                        <span className={cx('block-list__date-from')}>от {createdDate}</span>
                    </div>
                    {tasks.length
                        ? (
                            <button
                                type="button"
                                className={cx('btn btn-primary btn-primary--with-icon')}
                                data-task-id={tasks[0].task_id}
                                data-task-name={tasks[0].name}
                                onClick={this.handleShowTaskDetail}
                            >
                                {tasks[0].name}
                                <i className={cx('icon icon-chevron-right')} />
                            </button>
                        ) : null}
                </div>
            </div>
        );
    }
}

export default TaskCard;
