import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Overlay from '../../../components/Overlay';
import Input from '../../../components/Input';

import * as CONTENT from '../../../contentConstants';

const FormLogin = ({ showLoader, onInputChange, onFormSubmit }) => {
    return (
        <form className={cx('form-login')} onSubmit={onFormSubmit}>
            <div className={cx('form-group')}>
                <Input
                    name="login"
                    onInputChange={onInputChange}
                    placeholder="Логин"
                    iconClass="icon-user-1"
                />
                <Input
                    name="password"
                    type="password"
                    onInputChange={onInputChange}
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
                {/*<Link to="?restore-password">Забыл пароль?</Link>*/}
                <span>Поддержка: {CONTENT.PHONE}</span>
            </div>
        </form>
    );
};

FormLogin.propTypes = {
    showLoader: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
};

export default FormLogin;
