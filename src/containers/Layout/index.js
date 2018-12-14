import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import cx from 'classnames';

import Modal from '../Modal';
import AddModal from '../AddModal';
import FormRestore from '../Form/Restore';
import FormSearch from '../Form/Search';
import UserStatictics from '../UserStatictics';
import ClientDetail from '../Detail/Client';
import TaskDetail from '../Detail/Task';

import Overlay from '../../components/Overlay';

import { authenticationUser } from '../../redux/User/actions';

class Layout extends PureComponent {
    static propTypes = {
        component: PropTypes.func.isRequired,
        isAuth: PropTypes.bool.isRequired,
        showAddButton: PropTypes.bool.isRequired,
        showAddHelp: PropTypes.bool.isRequired,
        isNotFound: PropTypes.bool,
        session_id: PropTypes.string.isRequired,
        authenticationUser: PropTypes.func.isRequired,
    };
    static defaultProps = {
        isNotFound: false,
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
            showAddButton,
            showAddHelp,
            isAuth,
            session_id,
            ...rest
        } = this.props;

        return (
            <Route {...rest} render={matchProps => {
                if (!isAuth && !session_id) {
                    return <Redirect to="/" />;
                }

                if (!isAuth) {
                    return <Overlay size="big" />;
                }
        
                const { location: { search, state: routeState = {} }, match } = matchProps;

                const renderArray = [
                    <div key={0} className={cx('fr-app')}>
                        <div className={cx('fr-container', {
                            'fr-container--error': isNotFound,
                        })}>
                            <Component {...matchProps} />
                        </div>
                        {showAddButton && (
                            <div className={cx('btn-options')}>
                                <Link to="?add-modal" className={cx('btn-options__link')} />
                                {showAddHelp && <span className={cx('btn-options__tooltip')}>Однако, вам стоит подумать о будущем и создать пару задач…</span>}
                            </div>
                        )}
                    </div>
                ];
        
                if (search === '?restore-password') {
                    renderArray.push(
                        <Modal 
                            key={1}
                            centerPosition
                            modalClass="restore-pass-form"
                            onCloseModal={matchProps.history.goBack}
                        >
                            <FormRestore />
                        </Modal>
                    );
                }
                
                if (search.search(/\?search/) !== -1) {
                    const query = decodeURIComponent(search).split('=')[1];
                    renderArray.push(
                        <Modal
                            key={2}
                            centerPosition
                            modalClass="modal-search"
                            onCloseModal={matchProps.history.goBack}
                        >
                            <FormSearch defaultSearch={query} />
                        </Modal>
                    );
                }
        
                if (search === '?show-statistic') {
                    renderArray.push(
                        <Modal
                            key={3}
                            centerPosition
                            dialogClass="modal-dialog--xl"
                            contentClass="modal-content__p-0 modal-content__chart-stats"
                            onCloseModal={matchProps.history.goBack}
                        >
                            <UserStatictics />
                        </Modal>
                    );
                }
        
                if (search === '?add-modal') {
                    renderArray.push(
                        <AddModal key={4} onCloseModal={matchProps.history.goBack} />
                    );
                }

                if (match.path.search('/clients/') !== -1 && typeof match.params.id !== 'undefined') {
                    renderArray.push(
                        <Modal
                            key={5}
                            topPosition
                            modalClass="modal-custom--with-help-block"
                            onCloseModal={matchProps.history.goBack}
                        >
                            <ClientDetail id={match.params.id} />
                        </Modal>
                    );
                }

                if (match.path.search('/tasks/') !== -1 && typeof match.params.id !== 'undefined') {
                    const { title } = routeState;
                    renderArray.push(
                        <Modal
                            key={6}
                            topPosition
                            modalClass="modal-custom--wide-width"
                            onCloseModal={matchProps.history.goBack}
                        >
                            <TaskDetail
                                id={match.params.id}
                                title={title}
                                onCloseDetail={matchProps.history.goBack}
                            />
                        </Modal>
                    );
                }
        
                return renderArray;
            }} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { Tasks, User } = state;
    const isTaskEmpty = ownProps.path.search('/tasks') !== -1 && !Tasks.order.length && !Tasks.isFetching;    
    
    return {
        showAddButton: ownProps.path.search('/tasks') !== -1,
        showAddHelp: isTaskEmpty,
        isAuth: User.isAuth,
        session_id: User.session_id,
    };
};

const mapDispatcToProps = (dispatch) => {
    return {
        authenticationUser: (session_id) => dispatch(authenticationUser(session_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatcToProps,
)(Layout);
