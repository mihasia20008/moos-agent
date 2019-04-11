import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    static propTypes = {
        onCloseModal: PropTypes.func.isRequired,
        title: PropTypes.string,
        buttonText: PropTypes.string,
    };

    static defaultProps = {
        title: 'Восстановление пароля',
        buttonText: 'Восстановить',
    };

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
        const { title, buttonText } = this.props;

        switch (status) {
            case 0: {
                return (
                    <div>
                        <div className={cx('restore-pass__title')}>{title}</div>
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
                        <div className="modal-content__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="78" height="70" viewBox="0 0 78 70">
                                <path fill="#FFF" fillRule="evenodd"
                                      d="M74.75.25c-.063.016-.125.04-.188.063a2.022 2.022 0 0 0-1.25.937L32.438 64.625 4.311 39.25a2.007 2.007 0 0 0-2.085-.695 1.993 1.993 0 0 0-1.461 1.64c-.118.79.242 1.57.921 1.992l29.813 27a1.998 1.998 0 0 0 3-.438L76.688 3.376A2 2 0 0 0 74.75.25z" />
                            </svg>
                        </div>
                        <div className={cx('restore-pass__title')}>{title}</div>
                        <div className={cx('restore-pass__description')}>
                            Письмо с инструкциями было отправлено на почту
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
                        <div className={cx('restore-pass__title')}>{title}</div>
                        <Field
                            component={this.renderFieldItem}
                            name="email"
                            type="text"
                            aria-describedby="emailHelp"
                            placeholder="Эл. почта / Логин"
                        />
                        <div className={cx('form-group')}>
                            <button type="submit" className={cx('btn', 'btn-block', 'btn-white')}>
                                {buttonText}
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
