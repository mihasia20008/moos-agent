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
import EditAgentForm from '../Form/EditAgent';
import FormRestore from '../Form/Restore';
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
        showAddButton: PropTypes.bool.isRequired,
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
    
    render() {
        const {
            component: Component,
            isNotFound,
            isManager,
            showAddButton,
            showAddHelp,
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
        
                const { location: { search, state: routeState = {} }, match } = matchProps;

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

                let contentNode;

                switch (true) {
                    case search === '?restore-password': {
                        contentNode = (
                            <Modal
                                centerPosition
                                modalClass="restore-pass-form"
                                onCloseModal={matchProps.history.goBack}
                            >
                                <FormRestore />
                            </Modal>
                        );
                        break;
                    }
                    case search.search(/\?search/) !== -1: {
                        const query = decodeURIComponent(search).split('=')[1];
                        contentNode = (
                            <Modal
                                centerPosition
                                modalClass="modal-search"
                                onCloseModal={matchProps.history.goBack}
                            >
                                <FormSearch defaultSearch={query} />
                            </Modal>
                        );
                        break;
                    }
                    case search === '?show-statistic': {
                        contentNode = (
                            <Modal
                                centerPosition
                                dialogClass="modal-dialog--xl"
                                contentClass="modal-content__p-0 modal-content__chart-stats"
                                onCloseModal={matchProps.history.goBack}
                            >
                                <UserStatistics />
                            </Modal>
                        );
                        break;
                    }
                    case search.search(/\?add-modal/) !== -1: {
                        const addResult = search.match(/add-modal=[a-z-]{1,}/g);
                        if (addResult) {
                            const definitionKey = addResult[0].split('=')[1];
                            contentNode = (
                                <Modal
                                    topPosition
                                    modalClass="modal-custom--wide-width"
                                    preventOutsideClick
                                    onCloseModal={() => matchProps.history.go(-2)}
                                >
                                    <AddModalForm
                                        activeDefinitionKey={definitionKey}
                                        onCloseModal={matchProps.history.go}
                                    />
                                </Modal>
                            );
                        } else {
                            contentNode = (
                                <AddModalSelect
                                    onCloseModal={matchProps.history.goBack}
                                    onProgrammingRedirect={matchProps.history.push}
                                />
                            );
                        }
                        break;
                    }
                    case match.path.search('/clients/') !== -1 && typeof match.params.id !== 'undefined': {
                        contentNode = (
                            <Modal
                                topPosition
                                modalClass="modal-custom--with-help-block"
                                onCloseModal={matchProps.history.goBack}
                            >
                                <ClientDetail
                                    id={match.params.id}
                                    onProgrammingRedirect={matchProps.history.push}
                                />
                            </Modal>
                        );
                        break;
                    }
                    case match.path.search('/tasks/') !== -1 && typeof match.params.id !== 'undefined': {
                        const { title } = routeState;
                        contentNode = (
                            <Modal
                                topPosition
                                modalClass="modal-custom--wide-width"
                                preventOutsideClick
                                onCloseModal={matchProps.history.goBack}
                            >
                                <TaskDetail
                                    id={match.params.id}
                                    title={title}
                                    onCloseDetail={matchProps.history.goBack}
                                />
                            </Modal>
                        );
                        break;
                    }
                    case match.path.search('/agents/') !== -1 && typeof match.params.agent !== 'undefined': {
                        if (match.path.search('/users/new') !== -1) {
                            contentNode = (
                                <Modal
                                    centerPosition
                                    modalClass="user-edit-form"
                                    contentClass="modal-content--centred"
                                    onCloseModal={matchProps.history.goBack}
                                    preventOutsideClick
                                >
                                    <NewAgentForm
                                        companyId={match.params.agent}
                                        onCloseForm={matchProps.history.goBack}
                                    />
                                </Modal>
                            );
                            break;
                        }
                        if (typeof match.params.user !== 'undefined') {
                            contentNode = (
                                <Modal
                                    centerPosition
                                    modalClass="user-edit-form"
                                    contentClass="modal-content--centred"
                                    onCloseModal={matchProps.history.goBack}
                                    preventOutsideClick
                                >
                                    <EditAgentForm
                                        companyId={match.params.agent}
                                        userId={match.params.user}
                                        onCloseForm={matchProps.history.goBack}
                                    />
                                </Modal>
                            );
                            break;
                        }
                        if (match.path.search('/users') !== -1) {
                            contentNode = (
                                <Modal
                                    centerPosition
                                    modalClass="users-list"
                                    dialogClass="modal-dialog--md"
                                    contentClass="modal-content--centred"
                                    onCloseModal={matchProps.history.goBack}
                                >
                                    <AgentList id={match.params.agent} />
                                </Modal>
                            );
                            break;
                        }
                        break;
                    }
                    default: {
                        contentNode = null;
                    }
                }
        
                return [
                    <div key={0} className={cx('fr-app')}>
                        <div className={cx('fr-container', {
                            'fr-container--error': isNotFound,
                        })}>
                            {!isNotFound && <Sidebar />}
                            <Component {...matchProps} />
                        </div>
                        {showAddButton && (
                            <div className={cx('btn-options')}>
                                <Link to="?add-modal" className={cx('btn-options__link')} />
                                {showAddHelp && (
                                    <span className={cx('btn-options__tooltip')}>
                                        Однако, вам стоит подумать о будущем и создать пару задач…
                                    </span>
                                )}
                            </div>
                        )}
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
        showAddButton: ownProps.path && ownProps.path.search('/tasks') !== -1,
        showAddHelp: isTaskEmpty,
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
