import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';
import { withKeycloak } from 'react-keycloak';

import Overlay from "../../components/Overlay";
import Modal from '../../containers/Modal';
import FormLogin from '../../containers/Form/Login';
import FormForgotPassword from '../../containers/Form/ForgotPassword';
import SnackBar from "../../containers/SnackBar";

import { loginUser, authenticationUser } from '../../redux/User/actions';

import CONTENT from '../../contentConstants';

class Login extends PureComponent {
    static propTypes = {
        authType: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        isAuth: PropTypes.bool.isRequired,
    };

    state = {
        keycloakAuth: false,
        keycloakFetch: true,
        login: {
            name: 'login',
            placeholder: 'Логин',
            iconClass: 'icon-user-1',
            error: false,
            value: ''
        },
        password: {
            name: 'password',
            placeholder: 'Пароль',
            iconClass: 'icon-locker',
            error: false,
            value: ''
        },
    };

    componentDidMount() {
        const { authType, keycloak, dispatch } = this.props;
        if (authType === 'keycloak') {
            if (keycloak.authenticated) {
                this.setState({ keycloakAuth: true, keycloakFetch: false });
            }
        }
        if (authType === 'standard') {
            dispatch(authenticationUser())
                .then(() => this.setState({ keycloakFetch: false }));
        }
    }

    componentWillUnmount() {
        clearTimeout(this.errorTimeout);
    }

    handleInputChange = (key, value) => this.setState(prevState => (
        { [`${key}`]: Object.assign({}, prevState[key], { value }) }
    ));

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { login, password } = this.state;
        let canSubmit = true;
        if (login.value === '') {
            this.setState(prevState => (
                { login: Object.assign({}, prevState.login, { error: true }) }
            ));
            canSubmit = false;
        }
        if (password.value === '') {
            this.setState(prevState => (
                { password: Object.assign({}, prevState.password, { error: true }) }
            ));
            canSubmit = false;
        }
        if (canSubmit) {
            const { dispatch } = this.props;
            dispatch(loginUser(login.value, password.value));
        } else {
            this.errorTimeout = setTimeout(() => {
                this.setState(prevState => ({
                    login: Object.assign({}, prevState.login, { error: false }),
                    password: Object.assign({}, prevState.password, { error: false })
                }));
            }, 800);
        }
    };

    renderELogin() {
        const { history } = this.props;
        return (
            <Modal key={2} topPosition onCloseModal={history.goBack}>
                <div className={cx('modal-custom-header')}>Банковская гарантия 101-ЭГБ/17</div>
            </Modal>
        );
    }

    renderRestorePassword() {
        const { history } = this.props;
        return (
            <Modal
                key={1}
                centerPosition
                preventOutsideClick
                onCloseModal={history.goBack}
            >
                <FormForgotPassword
                    onCloseModal={history.goBack}
                />
            </Modal>
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
                        fields={this.state}
                        onInputChange={this.handleInputChange}
                        onFormSubmit={this.handleFormSubmit}
                    />
                    <div className={cx('fr-login-sidebar__bottom')}>
                        <span>{CONTENT.COPYRIGHT.replace('#ACTUAL_DATE#', new Date().getFullYear())}</span>
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
        const { location: { search }, isAuth, showSnackBar } = this.props;
        const { keycloakAuth, keycloakFetch } = this.state;

        if (keycloakFetch) {
            return <Overlay size="big" />;
        }

        if (isAuth || keycloakAuth) {
            return <Redirect to="/tasks" />
        }

        return [
            this.renderMainContent(),
            search === '?forgot-password' ? this.renderRestorePassword() : null,
            search === '?e-login' ? this.renderELogin() : null,
            showSnackBar ? <SnackBar key={2} /> : null
        ];
    }
};

const mapStateToProps = ({ User, Error }) => {
    return {
        authType: User.authType,
        isFetching: User.isFetching,
        isAuth: User.isAuth,
        showSnackBar: Error.show,
    };
};

export default withKeycloak(connect(mapStateToProps)(Login));
