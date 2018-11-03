import React from 'react';
import { Link } from 'react-router-dom';

import cls from 'classnames/bind';
import s from './style.css';

const cx = cls.bind(s);

const NotFound = () => {
    return [
        <Link key={0} className={cx('logo')} to="/">
            <img className={cx('logo__img')} src="img/logo-min.svg" alt="logo" />
        </Link>,
        <div key={1} className={cx('error-message')}>
            <p className={cx('error-message__title')}>Ошибка 404: страница не найдена</p>
            <Link className={cx('btn btn-secondary error-message__btn')} to="/">
                На главную
            </Link>
            <span className={cx('error-message__text')}>
                Поддержка: <a className={cx('error-message__phone')} href="tel: 74957990983">+7 (495) 799–09–83</a>
            </span>
        </div>
    ];
};

export default NotFound;
