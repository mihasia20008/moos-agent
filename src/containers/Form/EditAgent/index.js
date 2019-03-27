import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, initialize, getFormValues, getFormSyncErrors, change as changeFormValue } from 'redux-form';
import { connect } from 'react-redux';
import cx from 'classnames';

import Dropdown from '../../../components/Dropdown';
import Overlay from "../../../components/Overlay";

import validationForm from './helpers/validationForm';

import { editUser, resetEditingUserStatus } from "../../../redux/Agents/actions";
import { setErrorContent } from "../../../redux/Error/actions";
import { Agents } from "../../../services/api";

const formSettings = {
    form: 'editUser',
    validate: validationForm
};

class EditAgentForm extends PureComponent {
    static propTypes = {
        companyId: PropTypes.string.isRequired,
        onCloseForm: PropTypes.func.isRequired,
        editUserInfo: PropTypes.shape({
            fetching: PropTypes.bool.isRequired,
            status: PropTypes.bool.isRequired,
        }),
    };

    componentDidMount() {
        const { userId, dispatch } = this.props;
        Agents.getUserData(userId)
            .then(({ user }) => {
                dispatch(initialize(formSettings.form, {
                    name: `${user.lastName} ${user.firstName}`,
                    email: user.email,
                    ismanager: user.ismanager ? '1' : '0'
                }));
            })
            .catch(err => dispatch(setErrorContent(err.message)));
    }


    componentDidUpdate(prevProps) {
        const { onCloseForm, editUserInfo: nowEditUserInfo, dispatch } = this.props;
        const { editUserInfo: prevEditUserInfo } = prevProps;
        if (!prevEditUserInfo.status && nowEditUserInfo.status) {
            onCloseForm();
            dispatch(resetEditingUserStatus());
        }
    }

    onFormSubmit = (values) => {
        const { companyId, userId, dispatch } = this.props;
        dispatch(editUser({ companyId, username: userId, ...values }));
    };

    handleSubmitForm = (event) => {
        const { editUserInfo, handleSubmit } = this.props;
        if (editUserInfo.fetching) {
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
        const { editUserInfo } = this.props;
        return (
            <form onSubmit={this.handleSubmitForm}>
                <div className={cx('restore-pass__title')}>Изменение пользователя</div>
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
                        Изменить
                        {editUserInfo.fetching && <Overlay size="small" />}
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    const { Agents } = state;
    return {
        editUserInfo: Agents.editUser,
        formValues: getFormValues(formSettings.form)(state),
        formErrors: getFormSyncErrors(formSettings.form)(state),
    };
};

export default reduxForm(formSettings)(
    connect(mapStateToProps)(EditAgentForm)
);
