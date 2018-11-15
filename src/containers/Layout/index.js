import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import cx from 'classnames';

import LoginModal from '../LoginModal';
import AddModal from '../AddModal';
import FormRestore from '../Form/Restore';
import FormSearch from '../Form/Search';
import UserStatictics from '../UserStatictics';
import Overlay from '../../components/Overlay';

import { authenticationUser } from '../../redux/User/actions';

class Layout extends PureComponent {
    static propTypes = {
        component: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        isNotFound: PropTypes.bool,
        session_id: PropTypes.string,
        authenticationUser: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { session_id, isAuth, authenticationUser } = this.props;
        if (typeof session_id !== 'undefined' && !isAuth) {
            authenticationUser(session_id);
        }
    }
    
    render() {
        const {
            component: Component,
            isFetching,
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
        
                const { location: { search } } = matchProps;
        
                const renderArray = [
                    <div key={0} className={cx('fr-app')}>
                        <div className={cx('fr-container', {
                            'fr-container--error': isNotFound,
                        })}>
                            <Component {...matchProps} />
                            {isFetching && <Overlay size="big" />}
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
                        <LoginModal 
                            key={1}
                            centerPosition
                            modalClass="restore-pass-form"
                            onCloseModal={matchProps.history.goBack}
                        >
                            <FormRestore />
                        </LoginModal>
                    );
                }
        
                if (search === '?search') {
                    renderArray.push(
                        <LoginModal
                            key={2}
                            centerPosition
                            modalClass="modal-search"
                            onCloseModal={matchProps.history.goBack}>
                            <FormSearch />
                        </LoginModal>
                    );
                }
        
                if (search === '?show-statistic') {
                    renderArray.push(
                        <LoginModal
                            key={3}
                            centerPosition
                            dialogClass="modal-dialog--xl"
                            contentClass="modal-content__p-0 modal-content__chart-stats"
                            onCloseModal={matchProps.history.goBack}>
                            <UserStatictics />
                        </LoginModal>
                    );
                }
        
                if (search === '?add-modal') {
                    renderArray.push(
                        <AddModal key={4} onCloseModal={matchProps.history.goBack} />
                    );
                }
        
                return renderArray;
            }} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { Tasks, User } = state;
    return {
        showAddButton: ownProps.path.search('/tasks') !== -1 || ownProps.path.search('/clients') !== -1,
        showAddHelp: ownProps.path.search('/tasks') !== -1 && !Tasks.list.length && !Tasks.isFetching,
        isFetching: Object.keys(state).some(key => state[key].isFetching),
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
