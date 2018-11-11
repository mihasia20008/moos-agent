import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Overlay from '../../../components/Overlay';

import * as CONTENT from '../../../contentConstants';

const Login = ({ showLoader }) => {
    return (
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
                <Link to="/tasks" className={cx('btn btn-danger btn-block')}>
                    Вход <span className={cx('icon icon-chevron-right')} />
                    {showLoader && <Overlay size="small" />}
                </Link>
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
