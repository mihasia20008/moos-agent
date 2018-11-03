import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import LoginModal from '../../containers/LoginModal';

class Login extends PureComponent {
    renderELogin() {
        return (
            <LoginModal key={2}>
                <form>
                    <div className={cx('restore-pass__title')}>Восстановление пароля 2</div>
                    <div className={cx('form-group')}>
                        <input
                            type="email"
                            className={cx('form-control', 'form-control--transporent')}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <button className={cx('btn', 'btn-block', 'btn-white')}>Восстановить</button>
                    </div>
                </form>
            </LoginModal>
        );
    }

    renderRestorePassword() {
        return (
            <LoginModal key={1}>
                <form>
                    <div className={cx('restore-pass__title')}>Восстановление пароля</div>
                    <div className={cx('form-group')}>
                        <input
                            type="email"
                            className={cx('form-control', 'form-control--transporent')}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <button className={cx('btn', 'btn-block', 'btn-white')}>Восстановить</button>
                    </div>
                </form>
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
    
                <form className={cx('form-login')}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group__row-input')}>
                            <span className={cx('icon icon-user-1')} />
                            <input 
                                type="login"
                                className={cx('form-control', 'form-control--login')}
                                aria-describedby="login" 
                                placeholder="Логин"
                            />
                        </div>
                        <div className={cx('form-group__row-input')}>
                            <span className={cx('icon icon-locker')} />
                            <span className={cx('icon icon-eye')} />
                            <input
                                type="password"
                                className={cx('form-control', 'form-control--password')}
                                aria-describedby="password" 
                                placeholder="Пароль"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group mr-tp2')}>
                        <button className={cx('btn btn-danger btn-block')}>
                            Вход <span className={cx('icon icon-chevron-right')} />
                        </button>
                        <Link className={cx('btn btn-dark btn-block')} to="?e-login">
                            Вход с помощью Электронной подписи <span className={cx('icon icon-chevron-right')} />
                        </Link>
                    </div>
                    <div className={cx('form-login-bottom')}>
                        <Link to="?restore-password">Забыл пароль?</Link>
                        <span>Поддержка: +7 (495) 799–09–83</span>
                    </div>
                </form>
    
                <div className={cx('fr-login-sidebar__bottom')}>
                    <span>FarZoom 2018 © &nbsp; v. 1.2.9.1 ßeta 2 </span>
                    <a href="mailto:support@farzoom.com">support@farzoom.com</a>
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
        console.log(search);
        return [
            this.renderMainContent(),
            search === '?restore-password' ? this.renderRestorePassword() : null,
            search === '?e-login' ? this.renderELogin() : null,
        ];
    }
};

export default Login;
