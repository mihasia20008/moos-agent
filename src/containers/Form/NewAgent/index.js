import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, getFormValues, getFormSyncErrors, change as changeFormValue } from 'redux-form';
import { connect } from 'react-redux';
import cx from 'classnames';

import Dropdown from '../../../components/Dropdown';
import Overlay from "../../../components/Overlay";

import validationForm from './helpers/validationForm';

import { addUser, resetAddingUserStatus } from "../../../redux/Agents/actions";

const formSettings = {
    form: 'newUser',
    validate: validationForm
};

class NewAgentForm extends PureComponent {
    static propTypes = {
        companyId: PropTypes.string.isRequired,
        onCloseForm: PropTypes.func.isRequired,
        addUserInfo: PropTypes.shape({
            fetching: PropTypes.bool.isRequired,
            status: PropTypes.bool.isRequired,
        }),
    };

    componentDidUpdate(prevProps) {
        const { onCloseForm, addUserInfo: nowAddUserInfo, dispatch } = this.props;
        const { addUserInfo: prevAddUserInfo } = prevProps;

        if (!prevAddUserInfo.status && nowAddUserInfo.status) {
            onCloseForm();
            dispatch(resetAddingUserStatus());
        }
    }

    onFormSubmit = (values) => {
        const { session_id, companyId, dispatch } = this.props;
        dispatch(addUser(session_id, { companyId, ...values }));
    };

    handleSubmitForm = (event) => {
        const { addUserInfo, handleSubmit } = this.props;
        if (addUserInfo.fetching) {
            return;
        }
        handleSubmit(this.onFormSubmit)(event);
    };

    handleSelectDropdownItem = (name, key) => {
        const { dispatch } = this.props;
        dispatch(changeFormValue(formSettings.form, name, key));
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

    renderDropdownItem = ({ input: { name, value }, meta: { touched, error } }) => {
        return (
            <div className="form-group form-group--mb">
                <Dropdown
                    name={name}
                    toggleClassName="btn btn-dropdown--transparent"
                    defaultText="Роль"
                    defaultActive={value ? +value + 1 : 0}
                    list={[
                        { key: '-1', value: '' },
                        { key: '0', value: 'Пользователь' },
                        { key: '1', value: 'Менеджер' },
                    ]}
                    hideDefaultItem
                    onSelectItem={this.handleSelectDropdownItem}
                />
                {touched && error && <span className={cx('form-error')} style={{ marginTop: '16px' }}>{error}</span>}
            </div>
        );
    };

    render() {
        const { addUserInfo } = this.props;
        return (
            <form onSubmit={this.handleSubmitForm}>
                <div className={cx('restore-pass__title')}>Добавление пользователя</div>
                <Field
                    component={this.renderFieldItem}
                    name="name"
                    type="text"
                    aria-describedby="fioHelp"
                    placeholder="ФИО"
                />
                <Field
                    component={this.renderFieldItem}
                    name="email"
                    type="email"
                    aria-describedby="emailHelp"
                    placeholder="Эл. почта"
                />
                <Field
                    component={this.renderDropdownItem}
                    name="ismanager"
                />
                <div className={cx('form-group')}>
                    <button type="submit" className={cx('btn btn-block btn-white')}>
                        Сохранить
                        {addUserInfo.fetching && <Overlay size="small" />}
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    const { User, Agents } = state;
    return {
        session_id: User.session_id,
        addUserInfo: Agents.addUser,
        formValues: getFormValues(formSettings.form)(state),
        formErrors: getFormSyncErrors(formSettings.form)(state),
    };
};

export default reduxForm(formSettings)(
    connect(mapStateToProps)(NewAgentForm)
);
