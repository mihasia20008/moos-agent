import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';

import LoginModal from '../../containers/LoginModal';
import FormLogin from '../../containers/Form/Login';
import FormRestore from '../../containers/Form/Restore';

import { loginUser, authenticationUser } from '../../redux/User/actions';

import * as CONTENT from '../../contentConstants';

class Login extends PureComponent {
    state = {
        login: '',
        password: '',
    };

    componentDidMount() {
        const { session_id, authenticationUser } = this.props;
        if (typeof session_id !== 'undefined') {
            authenticationUser();
        }
    }

    handleInputBlur = (key, value) => this.setState({ [`${key}`]: value });

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { login, password } = this.state;
        this.props.loginUser(login, password);
    }

    renderELogin() {
        return (
            <LoginModal key={2} topPosition onCloseModal={this.props.history.goBack}>
                <div className={cx('modal-custom-header')}>Банковская гарантия 101-ЭГБ/17</div>
            </LoginModal>
        );
    }

    renderRestorePassword() {
        return (
            <LoginModal key={1} centerPosition onCloseModal={this.props.history.goBack}>
                <FormRestore />
            </LoginModal>
        );
    }

    renderMainContent() {
        const { isFetching } = this.props;

        return (
            <section key={0} className={cx('fr-app fr-login')}>
                <section className={cx('fr-login-sidebar')}>
                    <Link className={cx('fr-login-sidebar__logo')} to="/">
                        <img src="static/media/logo.svg" alt="farzoom" />
                    </Link>
                    <FormLogin
                        showLoader={isFetching}
                        onInputBlur={this.handleInputBlur}
                        onFormSubmit={this.handleFormSubmit}
                    />
                    <div className={cx('fr-login-sidebar__bottom')}>
                        <span>{CONTENT.COPYRIGHT}</span>
                        <a href={`mailto:${CONTENT.EMAIL}`}>{CONTENT.EMAIL}</a>
                    </div>
                </section>
                <section className={cx('fr-login-block')}>
                    <h1>Система управления возможностями</h1>
                </section>
            </section>
        );
    }

    render() {
        const { location: { search }, isAuth } = this.props;

        if (isAuth) {
            return <Redirect to="/tasks" />
        }

        return [
            this.renderMainContent(),
            search === '?restore-password' ? this.renderRestorePassword() : null,
            search === '?e-login' ? this.renderELogin() : null,
        ];
    }
};

const mapStateToProps = ({ User }) => {
    return {
        isFetching: User.isFetching,
        isAuth: User.isAuth,
        session_id: User.session_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (username, password) => dispatch(loginUser(username, password)),
        authenticationUser: () => dispatch(authenticationUser()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
