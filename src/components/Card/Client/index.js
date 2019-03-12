import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import CONTENT from '../../../contentConstants';

import { formatNumber } from '../../../services/utility';

const ClientCard = ({
    id,
    displayName,
    INN,
    KPP,
    OGRN,
    stats,
}) => {
    const { statusItems } = CONTENT;

    return (
        <div className={cx('block-list__item')}>
            <div className={cx('block-list__row')}>
                <div>
                    <div className={cx('block-list__info block-list__info--with-icon')}>
                        <span className={cx('icon icon-user')} />
                        <span dangerouslySetInnerHTML={{ __html: displayName }} />
                    </div>
                    <div className={cx('block-list__info')}>
                        <span style={{ marginRight: '5px' }}>ИНН:</span>
                        <span dangerouslySetInnerHTML={{ __html: INN }} />
                    </div>
                </div>
                {/*<div className={cx('block-list__location')}>*/}
                    {/*г. Ярославль*/}
                {/*</div>*/}
            </div>
            <div className={cx('block-list__row')}>
                <ul className={cx('stats-list')}>
                    {statusItems.map(({ key, className }) => {
                        return (typeof stats[key] !== 'undefined' && stats[key])
                            ? (
                                <li
                                    key={key}
                                    className={cx('stats-list__item', {
                                        [`stats-list__item--${className}`]: className
                                    })}
                                >
                                    <i className={cx('icon icon-ok')} />
                                    <span>{formatNumber(stats[key])}</span>
                                </li>
                            ) : null;
                    })}
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
                                <td>
                                    {`${formatNumber(stats.amount ? stats.amount : 0, true)} ₽`}
                                </td>
                                <td dangerouslySetInnerHTML={{ __html: KPP }} />
                                <td dangerouslySetInnerHTML={{ __html: OGRN }} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to={`/clients/${id}`} className="block-list__link" />
        </div>
    );
};

ClientCard.propTypes = {
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    INN: PropTypes.string,
    KPP: PropTypes.string,
    OGRN: PropTypes.string,
    stats: PropTypes.shape({
        amount: PropTypes.number,
        assigned: PropTypes.number,
        inprogress: PropTypes.number,
        lost: PropTypes.number,
        sold: PropTypes.number,
    }).isRequired,
};

ClientCard.defaultProps = {
    displayName: '<i style="font-style: italic; color: #ccc;">Название не указано</i>',
    INN: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
    KPP: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
    OGRN: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
};

export default ClientCard;
