import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Overlay from "../../../../../components/Overlay";

import { setUserEnable, setUserDisable } from "../../../../../redux/Agents/actions";

class UserItem extends PureComponent {
    static propTypes = {
        session_id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        agentId: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
        currentUserChanging: PropTypes.bool,
        changingStatus: PropTypes.bool,
    };

    static defaultProps = {
        currentUserChanging: false,
        changingStatus: true
    };

    handleSetDisable = () => {
        const { session_id, username, dispatch } = this.props;
        dispatch(setUserDisable(session_id, username));
    };

    handleSetEnable = () => {
        const { session_id, username, dispatch } = this.props;
        dispatch(setUserEnable(session_id, username));
    };

    handleToggleStatus = () => {
        const { enabled, changingStatus } = this.props;
        if (changingStatus) return;

        enabled ? this.handleSetDisable() : this.handleSetEnable();
    };

    renderStatusButton() {
        const { enabled, currentUserChanging } = this.props;

        return (
            <button
                type="button"
                className={cx('table__badge', {
                    'table__badge--success': enabled,
                    'table__badge--danger': !enabled
                })}
                onClick={this.handleToggleStatus}
            >
                {enabled ? 'Активен' : 'Заблокирован'}
                {currentUserChanging && <Overlay size="small" />}
            </button>
        );
    }

    render() {
        const { username, fullName, agentId } = this.props;
        return (
            <tr>
                <td>
                    <Link to={`/agents/${agentId}/users/${username}`} className={cx('table--text-bold')}>
                        {fullName}
                    </Link>
                </td>
                {/*<td>*/}
                    {/*<span>менеджер</span>*/}
                {/*</td>*/}
                <td>
                    {this.renderStatusButton()}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = ({ Agents, User }, ownProps) => {
    return {
        session_id: User.session_id,
        changingStatus: Agents.changingUser !== '',
        currentUserChanging: ownProps.username === Agents.changingUser,
    };
};

export default connect(mapStateToProps)(UserItem);
