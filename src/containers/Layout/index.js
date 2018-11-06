import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import cx from 'classnames';

import LoginModal from '../LoginModal';
import AddModal from '../AddModal';
import FormRestore from '../Form/Restore';
import FormSearch from '../Form/Search';
import UserStatictics from '../UserStatictics';
import Overlay from '../../components/Overlay';

const Layout = ({ component: Component, isFetching, isNotFound, showAddButton, showAddHelp, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => {
        const { location: { search } } = matchProps;

        const renderArray = [
            <div key={0} className={cx('fr-app')}>
                <div className={cx('fr-container', {
                    'fr-container--error': isNotFound,
                })}>
                    <Component {...matchProps} />
                    {isFetching && <Overlay />}
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
};

Layout.propTypes = {
  component: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  isNotFound: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
    return {
        showAddButton: ownProps.path.search('/tasks') !== -1 || ownProps.path.search('/clients') !== -1,
        showAddHelp: ownProps.path.search('/tasks') !== -1 && !state.Tasks.list.length && !state.Tasks.isFetching,
        // isFetching: Object.keys(state).some(key => state[key].isFetching),
    };
};

export default connect(
    mapStateToProps,
)(Layout);
