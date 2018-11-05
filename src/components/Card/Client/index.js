import React from 'react';
import cx from 'classnames';

const ClientCard = () => {
    return (
        <div className={cx('block-list__item')} data-toggle="modal" data-target="#clientModal">
            <div className={cx('block-list__row')}>
                <div>
                    <div className={cx('block-list__info block-list__info--with-icon')}>
                        <span className={cx('icon icon-user')} />
                        <span>ООО «ОДАС» Сколково</span>
                    </div>
                    <div className={cx('block-list__info')}>ИНН: 771375236257</div>
                </div>
                <div className={cx('block-list__location')}>
                    г. Ярославль
                </div>
            </div>
            <div className={cx('block-list__row')}>
                <ul className={cx('stats-list')}>
                    <li className={cx('stats-list__item stats-list__item--purple')}>
                        <i className={cx('icon icon-ok')} />
                        <span>1</span>
                    </li>
                    <li className={cx('stats-list__item stats-list__item--yellow')}>
                        <i className={cx('icon icon-ok')} />
                        <span>2</span>
                    </li>
                    <li className={cx('stats-list__item stats-list__item--green')}>
                        <i className={cx('icon icon-ok')} />
                        <span>10</span>
                    </li>
                </ul>
                <div>
                    <table className={cx('table block-list__table')}>
                        <tr>
                            <th>Общая сумма</th>
                            <th>КПП</th>
                            <th>ОГРН</th>
                        </tr>
                        <tr>
                            <td>7 896 124 ₽</td>
                            <td>771001001</td>
                            <td>771375236257</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientCard;
