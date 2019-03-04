import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import UserItem from './blocks/UserItem';

import { getAgentUsersList } from "../../../redux/Agents/actions";

class AgentList extends PureComponent {
    static propTypes = {
        list: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
    };

    componentDidMount() {
        const { session_id, id, dispatch } = this.props;
        dispatch(getAgentUsersList(session_id, id));
    }

    renderAgentList() {
        const { fetchingList, list, id } = this.props;

        if (fetchingList) {
            return (
                <tr>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
                        Список загружается
                    </td>
                </tr>
            );
        }

        if (!fetchingList && list.length === 0) {
            return (
                <tr>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
                        Список пользователей пуст
                    </td>
                </tr>
            );
        }

        return list.map((item, index) => (
            <UserItem
                key={index}
                agentId={id}
                username={item.username}
                fullName={item.fullName}
                enabled={item.enabled}
            />
        ));
    }

    render() {
        const { id } = this.props;

        return (
            <div className={cx('agent-list')}>
                <h3>Пользователи</h3>
                <table className={cx('table table__secondary')}>
                    <thead>
                        <tr>
                            <th>Пользователь</th>
                            {/*<th>Роль</th>*/}
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAgentList()}
                    </tbody>
                </table>
                <Link to={`/agents/${id}/users/new`} className={cx('btn-options__link btn-edit-user')} />
            </div>
        );
    }
}

const mapStateToProps = ({ Agents }) => {
    return {
        fetchingList: Agents.getUsersFetching,
        list: Agents.users,
    };
};

export default connect(mapStateToProps)(AgentList);
