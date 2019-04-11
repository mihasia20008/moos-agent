import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import AgentStats from './blocks/AgentStats';

import { declOfNum } from '../../../services/utility';

const users = ['пользователь', 'пользователя', 'пользователей'];
const clients = ['клиент', 'клиента', 'клиентов'];

const AgentCard = ({
    id,
    level,
    name,
    inn,
    agentsCount,
    companyCount,
    statList,
    onShowClients,
}) => {
    return (
        <div className={cx('fr-agent-card')} style={{ marginLeft: `${30 * level}px` }}>
            <div className={cx('fr-agent-card__body')}>
                <div className={cx('fr-agent-card__main')}>
                    <span className={cx('fr-agent-card__title')} dangerouslySetInnerHTML={{ __html: name }} />
                    <span>
                        <span style={{ marginRight: '5px' }}>ИНН:</span>
                        <span dangerouslySetInnerHTML={{ __html: inn }} />
                    </span>
                </div>
                <div className={cx('fr-agent-card__stats')}>
                    <Link to={`/agents/${id}/users`} className={cx('fr-agent-card__stats-item')} data-toggle="modal" data-target="#usersListModal">
                        <span className={cx('fr-agent-card__stats-value')}>{agentsCount}</span>
                        <span className={cx('fr-agent-card__stats-text')}>
                            {declOfNum(agentsCount, users)}
                        </span>
                    </Link>
                    <button
                        type="button"
                        className={cx('fr-agent-card__stats-item fr-agent-card__stats-item-button')}
                        onClick={onShowClients.bind(this, id)}
                    >
                        <span className={cx('fr-agent-card__stats-value')}>{companyCount}</span>
                        <span className={cx('fr-agent-card__stats-text')}>
                            {declOfNum(companyCount, clients)}
                        </span>
                    </button>
                    {/*<span className={cx('fr-agent-card__stats-item')}>*/}
                        {/*<span className={cx('fr-agent-card__stats-value')}>3</span>*/}
                        {/*<span className={cx('fr-agent-card__stats-text')}>субагенты</span>*/}
                    {/*</span>*/}
                </div>
            </div>
            <AgentStats items={statList} />
        </div>
    );
};

AgentCard.propTypes = {
    level: PropTypes.number,
    name: PropTypes.string,
    inn: PropTypes.string,
    statList: PropTypes.shape({
        assigned: PropTypes.shape({
            count: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
        }),
        lost: PropTypes.shape({
            count: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
        }),
        inprogress: PropTypes.shape({
            count: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
        }),
        sold: PropTypes.shape({
            count: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
        }),
    }),
    agentsCount: PropTypes.number.isRequired,
    companyCount: PropTypes.number.isRequired,
    onShowClients: PropTypes.func.isRequired,
};

AgentCard.defaultProps = {
    level: 0,
    name: '<i style="font-style: italic; color: #ccc;">Название не указано</i>',
    inn: '<i style="font-style: italic; color: #ccc;">Не указан</i>',
};

export default AgentCard;
