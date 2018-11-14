import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Overlay from '../../../components/Overlay';

import * as CONTENT from '../../../contentConstants';

const Login = ({ showLoader, onInputBlur, onFormSubmit }) => {
    return (
        <form className={cx('form-login')} onSubmit={onFormSubmit}>
            <div className={cx('form-group')}>
                <div className={cx('form-group__row-input')}>
                    <span className={cx('icon icon-user-1')} />
                    <input 
                        type="login"
                        className={cx('form-control', 'form-control--login')}
                        aria-describedby="login" 
                        placeholder="Логин"
                        onBlur={event => onInputBlur('username', event.target.value)}
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
                        onBlur={event => onInputBlur('password', event.target.value)}
                    />
                </div>
            </div>
            <div className={cx('form-group mr-tp2')}>
                <button
                    className={cx('btn btn-danger btn-block')}
                    type="submit"
                >
                    Вход <span className={cx('icon icon-chevron-right')} />
                    {showLoader && <Overlay size="small" />}
                </button>
                {/* <Link className={cx('btn btn-dark btn-block')} to="?e-login">
                    Вход с помощью Электронной подписи <span className={cx('icon icon-chevron-right')} />
                </Link> */}
            </div>
            <div className={cx('form-login-bottom')}>
                <Link to="?restore-password">Забыл пароль?</Link>
                <span>Поддержка: {CONTENT.PHONE}</span>
            </div>
        </form>
    );
};

export default Login;
