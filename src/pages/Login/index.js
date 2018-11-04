import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import LoginModal from '../../containers/LoginModal';
import FormLogin from '../../containers/Form/Login';
import FormRestore from '../../containers/Form/Restore';

import * as CONTENT from '../../contentConstants';

class Login extends PureComponent {
    renderELogin() {
        return (
            <LoginModal key={2} topPosition>
                <div className={cx('modal-custom-header')}>Банковская гарантия 101-ЭГБ/17</div>
            </LoginModal>
        );
    }

    renderRestorePassword() {
        return (
            <LoginModal key={1} centerPosition>
                <FormRestore />
            </LoginModal>
        );
    }

    renderMainContent() {
        return (
            <section key={0} className={cx('fr-app fr-login')}>
                <section className={cx('fr-login-sidebar')}>
                    <Link className={cx('fr-login-sidebar__logo')} to="/">
                        <img src="static/media/logo.svg" alt="farzoom" />
                    </Link>
                    <FormLogin />
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
        const { location: { search } } = this.props;

        return [
            this.renderMainContent(),
            search === '?restore-password' ? this.renderRestorePassword() : null,
            search === '?e-login' ? this.renderELogin() : null,
        ];
    }
};

export default Login;
