import React, { PureComponent } from 'react';
import cx from 'classnames';

class AddModalAgent extends PureComponent {
    render() {
        return (
            <form>
                <div className={cx('restore-pass__title')}>Добавление пользователя</div>
                <div className={cx('form-group')}>
                    <input
                        type="text"
                        className={cx('form-control form-control--transporent')}
                        id="userEditFIO"
                        aria-describedby="fioHelp"
                        placeholder="ФИО"
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        type="email"
                        className={cx('form-control form-control--transporent')}
                        id="userEditEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Эл. почта"
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        type="text"
                        className={cx('form-control form-control--transporent')}
                        id="userEditRole"
                        aria-describedby="roleHelp"
                        placeholder="Роль"
                    />
                </div>
                <div className={cx('form-group')}>
                    <button className={cx('btn btn-block btn-white')}>Сохранить</button>
                </div>
            </form>
        );
    }
}

export default AddModalAgent;
