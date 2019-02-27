import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { getAgentUsersList } from "../../../redux/Agents/actions";

class AgentList extends PureComponent {
    static propTypes = {
        list: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array])
    };

    componentDidMount() {
        const { session_id, id, dispatch } = this.props;
        dispatch(getAgentUsersList(session_id, id));
    }

    renderAgentList() {
        const { fetchingList, list } = this.props;

        if (fetchingList) {
            return (
                <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                        Список загружается
                    </td>
                </tr>
            );
        }

        if (!fetchingList && list.length === 0) {
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
                    <span className={cx('table--text-bold')}>{item.fullName}</span>
                </td>
                <td>
                    {/*<span>менеджер</span>*/}
                </td>
                <td>
                    {item.enabled ? (
                        <span className={cx('table__badge table__badge--success')}>Активен</span>
                    ) : (
                        <span className={cx('table__badge table__badge--danger')}>Заблокирован</span>
                    )}
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div className={cx('agent-list')}>
                <h3>Пользователи</h3>
                <table className={cx('table table__secondary')}>
                    <thead>
                        <tr>
                            <th>Пользователь</th>
                            <th>Роль</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAgentList()}
                    </tbody>
                </table>
                <Link to={`/agents/add`} className={cx('btn-options__link btn-edit-user')} />
            </div>
        );
    }
}

const mapStateToProps = ({ Agents }) => {
    return {
        fetchingList: Agents.isUsersFetching,
        list: Agents.users,
    };
};

export default connect(mapStateToProps)(AgentList);
