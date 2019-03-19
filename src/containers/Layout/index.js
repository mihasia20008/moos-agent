import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Sidebar from '../Sidebar';
import Modal from '../Modal';
import AddModalSelect from '../AddModal/Select';
import AddModalForm from '../AddModal/Form';
import NewAgentForm from '../Form/NewAgent';
import NewSubagentForm from '../Form/NewSubagent';
import EditAgentForm from '../Form/EditAgent';
import FormForgotPassword from '../Form/ForgotPassword';
import FormSearch from '../Form/Search';
import UserStatistics from '../UserStatistics';
import ClientDetail from '../Detail/Client';
import TaskDetail from '../Detail/Task';
import AgentList from '../Detail/Agent';
import SnackBar from '../SnackBar';

import Overlay from '../../components/Overlay';

import { authenticationUser } from '../../redux/User/actions';

class Layout extends PureComponent {
    static propTypes = {
        component: PropTypes.func.isRequired,
        isAuth: PropTypes.bool.isRequired,
        showAddAgent: PropTypes.bool,
        showAddTask: PropTypes.bool,
        showAddHelp: PropTypes.bool.isRequired,
        isManager: PropTypes.bool,
        isNotFound: PropTypes.bool,
        showSnackBar: PropTypes.bool.isRequired,
        session_id: PropTypes.string.isRequired,
        authenticationUser: PropTypes.func.isRequired,
    };
    static defaultProps = {
        isNotFound: false,
        isManager: false,
        showAddTask: false,
    };

    componentDidUpdate(prevProps) {
        const { path: pathNow, location: locationNow } = this.props;
        const { location: locationPrev } = prevProps;

        if (pathNow === locationNow.pathname && locationNow.pathname !== locationPrev.pathname) {
            window.scrollTo(0, 0)
        }
    }

    componentDidMount() {
        const { session_id, isAuth, authenticationUser } = this.props;
        if (typeof session_id !== 'undefined' && !isAuth) {
            authenticationUser(session_id);
        }
    }

    renderAddButton() {
        const {
            showAddTask,
            showAddHelp,
            showAddAgent,
        } = this.props;

        if (showAddTask) {
            return (
                <div className={cx('btn-options')}>
                    <Link to="?add-task" className={cx('btn-options__link')} />
                    {showAddHelp && (
                        <span className={cx('btn-options__tooltip')}>
                            Однако, вам стоит подумать о будущем и создать пару задач…
                        </span>
                    )}
                </div>
            );
        }

        if (showAddAgent) {
            return (
                <div className={cx('btn-options')}>
                    <Link to="?add-agent=true" className={cx('btn-options__link')} />
                </div>
            );
        }

        return null;
    }

    renderModalNode(props) {
        const { location: { search, state: routeState = {} }, history, match } = props;

        switch (true) {
            case search === '?restore-password': {
                return (
                    <Modal
                        centerPosition
                        modalClass="restore-pass-form"
                        onCloseModal={history.goBack}
                    >
                        <FormForgotPassword
                            title="Изменение пароля"
                            buttonText="Изменить"
                            onCloseModal={history.goBack}
                        />
                    </Modal>
                );
            }
            case search.search(/\?search/) !== -1: {
                const query = decodeURIComponent(search).split('=')[1];
                return (
                    <Modal
                        centerPosition
                        modalClass="modal-search"
                        onCloseModal={history.goBack}
                    >
                        <FormSearch defaultSearch={query} />
                    </Modal>
                );
            }
            case search === '?show-statistic': {
                return (
                    <Modal
                        centerPosition
                        dialogClass="modal-dialog--xl"
                        contentClass="modal-content__p-0 modal-content__chart-stats"
                        onCloseModal={history.goBack}
                    >
                        <UserStatistics />
                    </Modal>
                );
            }
            case search.search(/\?add-task/) !== -1: {
                const addResult = search.match(/add-task=[a-z-]+/g);
                if (addResult) {
                    const definitionKey = addResult[0].split('=')[1];
                    return (
                        <Modal
                            topPosition
                            modalClass="modal-custom--wide-width"
                            preventOutsideClick
                            onCloseModal={() => history.go(-2)}
                        >
                            <AddModalForm
                                activeDefinitionKey={definitionKey}
                                onCloseModal={history.go}
                            />
                        </Modal>
                    );
                } else {
                    return (
                        <AddModalSelect
                            onCloseModal={history.goBack}
                            onProgrammingRedirect={history.push}
                        />
                    );
                }
            }
            case search.search(/\?add-agent/) !== -1: {
                return (
                    <Modal
                        centerPosition
                        modalClass="user-edit-form"
                        contentClass="modal-content--centred"
                        onCloseModal={history.goBack}
                        preventOutsideClick
                    >
                        <NewSubagentForm
                            // companyId={match.params.agent}
                            onCloseModal={history.goBack}
                        />
                    </Modal>
                );
            }
            case match.path.search('/clients/') !== -1 && typeof match.params.id !== 'undefined': {
                return (
                    <Modal
                        topPosition
                        modalClass="modal-custom--with-help-block"
                        onCloseModal={history.goBack}
                    >
                        <ClientDetail
                            id={match.params.id}
                            onProgrammingRedirect={history.push}
                        />
                    </Modal>
                );
            }
            case match.path.search('/tasks/') !== -1 && typeof match.params.id !== 'undefined': {
                const { title } = routeState;
                return (
                    <Modal
                        topPosition
                        modalClass="modal-custom--wide-width"
                        preventOutsideClick
                        onCloseModal={history.goBack}
                    >
                        <TaskDetail
                            id={match.params.id}
                            title={title}
                            onCloseDetail={history.goBack}
                        />
                    </Modal>
                );
            }
            case match.path.search('/agents/') !== -1 && typeof match.params.agent !== 'undefined': {
                if (match.path.search('/users/new') !== -1) {
                    return (
                        <Modal
                            centerPosition
                            modalClass="user-edit-form"
                            contentClass="modal-content--centred"
                            onCloseModal={history.goBack}
                            preventOutsideClick
                        >
                            <NewAgentForm
                                companyId={match.params.agent}
                                onCloseForm={history.goBack}
                            />
                        </Modal>
                    );
                }
                if (typeof match.params.user !== 'undefined') {
                    return (
                        <Modal
                            centerPosition
                            modalClass="user-edit-form"
                            contentClass="modal-content--centred"
                            onCloseModal={history.goBack}
                            preventOutsideClick
                        >
                            <EditAgentForm
                                companyId={match.params.agent}
                                userId={match.params.user}
                                onCloseForm={history.goBack}
                            />
                        </Modal>
                    );
                }
                if (match.path.search('/users') !== -1) {
                    return (
                        <Modal
                            centerPosition
                            modalClass="users-list"
                            dialogClass="modal-dialog--md"
                            contentClass="modal-content--centred"
                            onCloseModal={history.goBack}
                        >
                            <AgentList id={match.params.agent} />
                        </Modal>
                    );
                }
                return null;
            }
            default: {
                return null;
            }
        }
    }
    
    render() {
        const {
            component: Component,
            isNotFound,
            isManager,
            isAuth,
            session_id,
            showSnackBar,
            ...rest
        } = this.props;

        return (
            <Route {...rest} render={matchProps => {
                if (!isAuth && !session_id) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                search: "",
                            }}
                        />
                    );
                }

                if (!isAuth) {
                    return <Overlay size="big" />;
                }
        
                const { match } = matchProps;

                if (match.path.search('/agents/') !== -1 && !isManager) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/tasks",
                                search: "",
                            }}
                        />
                    );
                }

                const contentNode = this.renderModalNode(matchProps);

                return [
                    <div key={0} className={cx('fr-app')}>
                        <div className={cx('fr-container', {
                            'fr-container--error': isNotFound,
                        })}>
                            {!isNotFound && <Sidebar />}
                            <Component {...matchProps} />
                        </div>
                        {this.renderAddButton()}
                    </div>,
                    <CSSTransition
                        key={1}
                        timeout={200}
                        in={Boolean(contentNode)}
                        classNames="fade"
                    >
                        <div>{contentNode}</div>
                    </CSSTransition>,
                    showSnackBar ? <SnackBar key={2} /> : null
                ];
            }} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { Tasks, User, Error } = state;
    const isTaskEmpty = ownProps.path &&
        ownProps.path.search('/tasks') !== -1 &&
        !Tasks.order.length &&
        !Tasks.isFetching;
    
    return {
        showAddTask: ownProps.path && ownProps.path.search('/tasks') !== -1,
        showAddHelp: isTaskEmpty,
        showAddAgent: ownProps.path && ownProps.path.search('/agents') !== -1,
        isAuth: User.isAuth,
        session_id: User.session_id,
        isManager: User.ismanager,
        showSnackBar: Error.show,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticationUser: (session_id) => dispatch(authenticationUser(session_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Layout);
