import React, { PureComponent } from 'react';
import { reduxForm, Field, getFormValues, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import cx from 'classnames';

import Overlay from "../../../components/Overlay";

import { User } from '../../../services/api';

const formSettings = {
    form: 'forgotPassword',
    validate: (values) => {
        const { email } = values;

        if (!email) {
            return { email: 'Поле обязательно для заполнения!' };
        }
        if (email.search('@') !== -1 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return { email: 'Введен некорректный e-mail!' };
        }

        return {};
    }
};

class FormForgotPassword extends PureComponent {
    state = {
        restoring: false,
        status: -1,
    };

    onFormSubmit = async (values) => {
        try {
            this.setState({ restoring: true });
            const { isSuccess } = await User.recoverPassword(values.email);
            if (isSuccess) {
                this.setState({ restoring: false, status: 1 });
                return;
            }
            this.setState({ restoring: false, status: 0 });
        } catch (err) {
            console.log(err);
        }
    };

    handleSubmitForm = (event) => {
        const { handleSubmit } = this.props;
        const { restoring } = this.state;

        if (restoring) {
            return;
        }

        handleSubmit(this.onFormSubmit)(event);
    };

    handleCloseForm = () => {
        const { onCloseModal } = this.props;
        onCloseModal();
    };

    renderFieldItem = ({ input, meta: { touched, error }, ...rest }) => {
        return (
            <div className={cx('form-group')}>
                <input
                    className={cx('form-control form-control--transporent')}
                    {...input}
                    {...rest}
                />
                {touched && error && <span className={cx('form-error')}>{error}</span>}
            </div>
        );
    };

    render() {
        const { restoring, status } = this.state;

        switch (status) {
            case 0: {
                return (
                    <div>
                        <div className={cx('restore-pass__title')}>Восстановление пароля</div>
                        <div className={cx('restore-pass__description')}>
                            В процессе восстановления пароля произошла ошибка
                        </div>
                        <div className={cx('form-group')}>
                            <button
                                type="button"
                                className={cx('btn', 'btn-block', 'btn-white')}
                                onClick={this.handleCloseForm}
                            >
                                Продолжить
                            </button>
                        </div>
                    </div>
                );
            }
            case 1: {
                return (
                    <div>
                        <div className={cx('restore-pass__title')}>Восстановление пароля</div>
                        <div className={cx('restore-pass__description')}>
                            Письмо с инструкциями для восстановления пароля было отправлено на почту
                        </div>
                        <div className={cx('form-group')}>
                            <button
                                type="button"
                                className={cx('btn', 'btn-block', 'btn-white')}
                                onClick={this.handleCloseForm}
                            >
                                Продолжить
                            </button>
                        </div>
                    </div>
                );
            }
            default: {
                return (
                    <form onSubmit={this.handleSubmitForm}>
                        <div className={cx('restore-pass__title')}>Восстановление пароля</div>
                        <Field
                            component={this.renderFieldItem}
                            name="email"
                            type="text"
                            aria-describedby="emailHelp"
                            placeholder="Эл. почта / Логин"
                        />
                        <div className={cx('form-group')}>
                            <button type="submit" className={cx('btn', 'btn-block', 'btn-white')}>
                                Восстановить
                                {restoring && <Overlay size="small" />}
                            </button>
                        </div>
                    </form>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        formValues: getFormValues(formSettings.form)(state),
        formErrors: getFormSyncErrors(formSettings.form)(state),
    };
};

export default reduxForm(formSettings)(
    connect(mapStateToProps)(FormForgotPassword)
);
