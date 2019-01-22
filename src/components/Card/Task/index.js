import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { declOfNum } from '../../../services/utility';

const days = ['день', 'дня', 'дней'];

const phasesText = [
    'Подача заявки',
    'Рассмотрение заявки',
    'Согласование документов',
    'Выдача гарантии'
];

const TaskCard = ({
    orderNumber,
    createdDate,
    durationDays,
    principalCompany_displayName,
    principalCompany_INN,
    purchaseAmount,
    contract_max_price,
    daysToStart,
    phases,
    tasks,
 }) => {
    const phasesCount = phases.length - 1;
    const disabledPhases = 3 - phasesCount;
    return (
        <div className={cx('block-list__item')}>
            <div className={cx('block-list__row')}>
                <div className={cx('stages-progress')}>
                    {phases.map((phase, index) => (
                        <div
                            key={phase.phaseId}
                            className={cx('stages-progress__item', {
                                'stages-progress__item--confirmed': index < phasesCount,
                                'stages-progress__item--active': index === phasesCount,
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
                                {phasesText[phasesCount + item + 1]}
                            </span>
                        </div>
                    ))}
                </div>
                {daysToStart ? (
                    <div className={cx('block-list__posted-time')}>
                        <span>{daysToStart} {declOfNum(daysToStart, days)}</span>
                    </div>
                ) : null}
            </div>
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
                                <th>Предложеная цена</th>
                            </tr>
                            <tr>
                                <td>{durationDays} {declOfNum(durationDays, days)}</td>
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
                        <Link
                            to={{
                                pathname: `/tasks/${tasks[0].task_id}`,
                                state: { title: tasks[0].name }
                            }}
                            className={cx('btn btn-primary btn-primary--with-icon')}
                        >
                            {tasks[0].name}
                            <i className={cx('icon icon-chevron-right')} />
                        </Link>
                    ) : null}
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    orderNumber: PropTypes.string.isRequired,
    createdDate: PropTypes.string,
    durationDays: PropTypes.number,
    principalCompany_displayName: PropTypes.string,
    principalCompany_INN: PropTypes.string,
    purchaseAmount: PropTypes.string,
    contract_max_price: PropTypes.string,
    daysToStart: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
    phases: PropTypes.array,
    tasks: PropTypes.array,
};

TaskCard.defaultProps = {
    principalCompany_INN: '&mdash;',
    purchaseAmount: '&mdash;',
    contract_max_price: '&mdash;',
    phases: []
};

export default TaskCard;
