import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import AgentStats from './blocks/AgentStats';

const AgentCard = ({
    id,
    name,
    inn,
    agentsCount,
    statList,
}) => {
    return (
        <div className={cx('fr-agent-card')}>
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
                        <span className={cx('fr-agent-card__stats-text')}>пользователи</span>
                    </Link>
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
};

AgentCard.defaultProps = {
    name: '<i style="font-style: italic; color: #ccc;">Название не указано</i>',
    inn: '<i style="font-style: italic; color: #ccc;">Не указан</i>',
};

export default AgentCard;
