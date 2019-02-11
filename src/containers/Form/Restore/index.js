import React from 'react';
import cx from 'classnames';

const FormRestore = () => {
    return (
        <form>
            <div className={cx('restore-pass__title')}>Изменение пароля</div>
            <div className="form-group with-icon-right">
                <span className="icon icon-eye" />
                <input
                    type="password"
                    className="form-control form-control--transporent"
                    id="passwordInput"
                    aria-describedby="passwordInput"
                    placeholder="Пароль"
                />
            </div>
            <div className="form-group with-icon-right">
                <span className="icon icon-eye" />
                <input
                    type="password"
                    className="form-control form-control--transporent"
                    id="repeatpasswordInput"
                    aria-describedby="repeatpasswordInput"
                    placeholder="Повторите пароль"
                />
            </div>
            <div className={cx('form-group')}>
                <button className={cx('btn', 'btn-block', 'btn-white')}>Восстановить</button>
            </div>
        </form>
    );
};

export default FormRestore;
