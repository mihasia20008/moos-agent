import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

class AgentList extends PureComponent {
    static propTypes = {
        list: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array])
    };

    renderAgentList() {
        const { fetchingList, list } = this.props;

        if (fetchingList) {
            return (
                <tr>
                    <td colSpan={3}>
                        Список загружается
                    </td>
                </tr>
            );
        }

        if (fetchingList || !list || list.length === 0) {
            return (
                <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                        Список пользователей пуст
                    </td>
                </tr>
            );
        }

        return list.map((item, index) => (
            <tr key={index}>
                <td>
                    <span className={cx('table--text-bold')}>{item}</span>
                </td>
                <td>
                    <span>менеджер</span>
                </td>
                <td>
                    <span className={cx('table__badge table__badge--success')}>Активен</span>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div className={cx('agent-list')}>
                <h3>Пользователи</h3>
                <table className={cx('table table__secondary')}>
                    <tbody>
                        <tr>
                            <th>Пользователь</th>
                            <th>Роль</th>
                            <th>Статус</th>
                        </tr>
                        {this.renderAgentList()}
                    </tbody>
                </table>
                <Link to={`/agents/add`} className={cx('btn-options__link btn-edit-user')} />
            </div>
        );
    }
}

const mapStateToProps = ({ Agents }, props) => {
    const { isFetching, agents } = Agents;

    return {
        fetchingList: isFetching,
        list: agents[props.id] ? agents[props.id].agentLogins : [],
    };
};

export default connect(mapStateToProps)(AgentList);
