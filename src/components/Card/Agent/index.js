import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

const AgentCard = ({
    id,
    name,
    inn,
    agentsCount,
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
            <div className={cx('fr-agent-card__footer')}>
                <div className={cx('fr-agent-card__footer-item fr-agent-card__footer-item--purple')} style={{ width: '47.2%' }}>
                    <div className={cx('fr-agent-card__footer-item-counter')}>
                        <span className={cx('icon icon-ok')} />
                        <span className={cx('fr-agent-card__footer-item-counter-value')}>1</span>
                    </div>
                    <div className={cx('fr-agent-card__footer-item-cost')}>
                        <span>5 000 000 ₽</span>
                    </div>
                </div>
                <div className={cx('fr-agent-card__footer-item fr-agent-card__footer-item--yellow')} style={{ width: '34.5%' }}>
                    <div className={cx('fr-agent-card__footer-item-counter')}>
                        <span className={cx('icon icon-ok')} />
                        <span className={cx('fr-agent-card__footer-item-counter-value')}>2</span>
                    </div>
                    <div className={cx('fr-agent-card__footer-item-cost')}>
                        <span>3 000 000 ₽</span>
                    </div>
                </div>
                <div className={cx('fr-agent-card__footer-item fr-agent-card__footer-item--green')} style={{ width: '18.3%' }}>
                    <div className={cx('fr-agent-card__footer-item-counter')}>
                        <span className={cx('icon icon-ok')} />
                        <span className={cx('fr-agent-card__footer-item-counter-value')}>1</span>
                    </div>
                    <div className={cx('fr-agent-card__footer-item-cost')}>
                        <span>500 000 ₽</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

AgentCard.propTypes = {
    name: PropTypes.string,
    inn: PropTypes.string,
    agentsCount: PropTypes.number.isRequired,
};

AgentCard.defaultProps = {
    name: '<i style="font-style: italic; color: #ccc;">Название не указано</i>',
    inn: '<i style="font-style: italic; color: #ccc;">Не указан</i>',
};

export default AgentCard;
