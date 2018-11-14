import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Overlay from '../../../components/Overlay';
import Input from '../../../components/Input';

import * as CONTENT from '../../../contentConstants';

const Login = ({ showLoader, onInputBlur, onFormSubmit }) => {
    return (
        <form className={cx('form-login')} onSubmit={onFormSubmit}>
            <div className={cx('form-group')}>
                <Input
                    name="login"
                    onInputBlur={onInputBlur}
                    placeholder="Логин"
                    iconClass="icon-user-1"
                />
                <Input
                    name="password"
                    type="password"
                    onInputBlur={onInputBlur}
                    placeholder="Пароль"
                    iconClass="icon-locker"
                />
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
