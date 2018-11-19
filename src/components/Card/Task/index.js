import React from 'react';
import cx from 'classnames';

import { declOfNum } from '../../../services/utility';

const days = ['день', 'дня', 'дней'];

const TaskCard = ({
    createdDate,
    durationDays,
    principalCompany_displayName,
    principalCompany_INN,
 }) => {
    return (
        <div className={cx('block-list__item')}>
            <div className={cx('block-list__row')}>
                <div className={cx('stages-progress')}>
                    <div className={cx('stages-progress__item stages-progress__item--confirmed')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Подано</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--confirmed')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Отказ</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--active')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Требует изменения</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--disabled')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Готово к отправке</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--disabled')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Готово к отправке</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--disabled')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Отправлено</span>
                    </div>
                </div>
                <div className={cx('block-list__posted-time')}>
                    <span>3 дня</span>
                </div>
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
                                <td>5 000 000.00 ₽</td>
                                <td>2 213 942 123.00 ₽</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={cx('block-list__row')}>
                <div className={cx('block-list__desc')}>
                    <span>101-ЭГБ/17</span>
                    <span className={cx('block-list__date-from')}>от {createdDate}</span>
                </div>
                <button className={cx('btn btn-primary btn-primary--with-icon')}>
                    Заполнить уведомление об отказе
                    <i className={cx('icon icon-chevron-right')} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
