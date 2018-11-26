import React from 'react';
import cx from 'classnames';

const FormRestore = () => {
    return (
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
    );
};

export default FormRestore;
