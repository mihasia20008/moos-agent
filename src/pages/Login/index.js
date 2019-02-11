import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';

import Modal from '../../containers/Modal';
import FormLogin from '../../containers/Form/Login';
import FormRestore from '../../containers/Form/Restore';

import { loginUser, authenticationUser } from '../../redux/User/actions';

import * as CONTENT from '../../contentConstants';
import SnackBar from "../../containers/SnackBar";

class Login extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isAuth: PropTypes.bool.isRequired,
        session_id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
        loginUser: PropTypes.func.isRequired,
        authenticationUser: PropTypes.func.isRequired,
    };

    state = {
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
        const { session_id, authenticationUser } = this.props;
        if (session_id) {
            authenticationUser(session_id);
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
            this.props.loginUser(login.value, password.value);
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
        return (
            <Modal key={2} topPosition onCloseModal={this.props.history.goBack}>
                <div className={cx('modal-custom-header')}>Банковская гарантия 101-ЭГБ/17</div>
            </Modal>
        );
    }

    renderRestorePassword() {
        return (
            <Modal key={1} centerPosition onCloseModal={this.props.history.goBack}>
                <FormRestore />
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
        const { location: { search }, isAuth, showSnackBar } = this.props;

        if (isAuth) {
            return <Redirect to="/tasks" />
        }

        return [
            this.renderMainContent(),
            search === '?restore-password' ? this.renderRestorePassword() : null,
            search === '?e-login' ? this.renderELogin() : null,
            showSnackBar ? <SnackBar key={2} /> : null
        ];
    }
};

const mapStateToProps = ({ User, Error }) => {
    return {
        isFetching: User.isFetching,
        isAuth: User.isAuth,
        session_id: User.session_id,
        showSnackBar: Error.show,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (username, password) => dispatch(loginUser(username, password)),
        authenticationUser: (session_id) => dispatch(authenticationUser(session_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
