import React from 'react';
import cx from 'classnames';

const ClientCard = ({
    displayName,
    INN,
    KPP,
    OGRN,
}) => {
    return (
        <div className={cx('block-list__item')}>
            <div className={cx('block-list__row')}>
                <div>
                    <div className={cx('block-list__info block-list__info--with-icon')}>
                        <span className={cx('icon icon-user')} />
                        <span dangerouslySetInnerHTML={{ __html: displayName }} />
                    </div>
                    <div className={cx('block-list__info')} dangerouslySetInnerHTML={{ __html: INN }} />
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
                        <tbody>
                            <tr>
                                <th>Общая сумма</th>
                                <th>КПП</th>
                                <th>ОГРН</th>
                            </tr>
                            <tr>
                                <td>7 896 124 ₽</td>
                                <td dangerouslySetInnerHTML={{ __html: KPP }} />
                                <td dangerouslySetInnerHTML={{ __html: OGRN }} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

ClientCard.defaultProps = {
    displayName: '<i style="font-style: italic; color: #ccc;">Название не указано</i>',
    INN: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
    KPP: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
    OGRN: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
}

export default ClientCard;
