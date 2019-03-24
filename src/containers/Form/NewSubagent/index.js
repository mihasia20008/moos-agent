import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, getFormValues, getFormSyncErrors, change as changeFormValue } from 'redux-form';
import { connect } from 'react-redux';
import cx from 'classnames';

import Dropdown from '../../../components/Dropdown';
import Overlay from "../../../components/Overlay";
import TextFieldWithAutoComplete from '../../../components/TextFieldWithAutoComplete';

import validationForm from './helpers/validationForm';

import {addSubagent, getAgentsList, resetAddingSubagentStatus} from "../../../redux/Agents/actions";

const formSettings = {
    form: 'newSubagent',
    validate: validationForm
};

class NewSubagentForm extends PureComponent {
    static propTypes = {
        onCloseModal: PropTypes.func.isRequired,
        agents: PropTypes.array.isRequired,
        addAgentInfo: PropTypes.shape({
            fetching: PropTypes.bool.isRequired,
            status: PropTypes.bool.isRequired,
        }),
    };

    static getProcessesFilter(agents, companyId = '') {
        let active = 0;
        const list = agents.reduce((acc, agent) => {
            if (companyId === agent.id) {
                active = acc.length;
            }
            const name = typeof agent.displayName !== 'undefined' && agent.displayName
                ? agent.displayName
                : typeof agent.shortName !== 'undefined' && agent.shortName
                    ? agent.shortName
                    : typeof agent.fullName !== 'undefined' && agent.fullName
                        ? agent.fullName
                        : undefined;
            return acc.concat([{ key: agent.id, value: name }]);
        }, [{ key: '-1', value: '' }]);
        return { active, list };
    }

    state = {
        status: -1,
    };

    componentDidUpdate(prevProps) {
        const { addAgentInfo: nowAddAgentInfo } = this.props;
        const { addAgentInfo: prevAddAgentInfo } = prevProps;

        if (prevAddAgentInfo.fetching && !nowAddAgentInfo.fetching) {
            this.setState({ status: +nowAddAgentInfo.status });
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getAgentsList());
    }

    handleCloseForm = () => {
        const { onCloseModal, dispatch } = this.props;
        onCloseModal();

        dispatch(getAgentsList());
        dispatch(resetAddingSubagentStatus());
    };

    handleReturnForm = () => this.setState({ status: -1 });

    onFormSubmit = (values) => {
        const { dispatch } = this.props;
        dispatch(addSubagent(values));
    };

    handleSubmitForm = (event) => {
        const { addAgentInfo, handleSubmit } = this.props;
        if (addAgentInfo.fetching) {
            return;
        }
        handleSubmit(this.onFormSubmit)(event);
    };

    handleSelectDropdownItem = (name, key) => {
        const { dispatch } = this.props;
        dispatch(changeFormValue(formSettings.form, name, key));
    };

    handleChangeSearchField = (name, value) => {
        const { dispatch } = this.props;
        dispatch(changeFormValue(formSettings.form, name, value));
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

    renderDropdownItem = (params) => {
        const { input: { name, value }, meta: { touched, error }, placeholder } = params;
        const { agents } = this.props;
        const dropdownSettings = NewSubagentForm.getProcessesFilter(agents, value);

        return (
            <div className="form-group form-group--mb">
                <Dropdown
                    name={name}
                    toggleClassName="btn btn-dropdown--transparent"
                    defaultText={placeholder}
                    defaultActive={dropdownSettings.active}
                    list={dropdownSettings.list}
                    hideDefaultItem
                    onSelectItem={this.handleSelectDropdownItem}
                />
                {touched && error && <span className={cx('form-error')} style={{ marginTop: '16px' }}>{error}</span>}
            </div>
        );
    };

    renderSearchField = ({ input, meta, ...rest }) => {
        return (
            <TextFieldWithAutoComplete
                {...input}
                {...rest}
                meta={meta}
                onSelect={this.handleChangeSearchField}
                onClear={this.handleChangeSearchField}
                classNames={{
                    container: cx('form-group'),
                    input: cx('form-control form-control--transporent'),
                    error: cx('form-error')
                }}
            />
        );
    };

    render() {
        const { addAgentInfo, wasFetchingAgents } = this.props;
        const { status } = this.state;

        switch (status) {
            case 0: {
                return (
                    <div>
                        <div className={cx('restore-pass__title')}>
                            Добавление субагента
                        </div>
                        <div className={cx('restore-pass__description')}>
                            В процессе создания субагента произошла ошибка
                        </div>
                        <div className={cx('form-group')}>
                            <button
                                type="button"
                                className={cx('btn', 'btn-block', 'btn-white')}
                                onClick={this.handleCloseForm}
                            >
                                Продолжить
                            </button>
                            <button
                                type="button"
                                className={cx('btn', 'btn-block', 'btn-white')}
                                onClick={this.handleReturnForm}
                            >
                                Назад
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
                        <div className={cx('restore-pass__title')}>
                            Субагент добавлен
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
                        <div className={cx('restore-pass__title')}>Добавление субагента</div>
                        <Field
                            component={this.renderSearchField}
                            name="companyId"
                            placeholder="Клиент"
                        />
                        <Field
                            component={wasFetchingAgents ? this.renderDropdownItem : this.renderFieldItem}
                            name="agentCompanyId"
                            placeholder="Агент"
                        />
                        <div className={cx('form-group')}>
                            <button type="submit" className={cx('btn btn-block btn-white')}>
                                Добавить
                                {addAgentInfo.fetching && <Overlay size="small" />}
                            </button>
                        </div>
                    </form>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
    const { Agents } = state;
    return {
        addAgentInfo: Agents.addAgent,
        agents: Agents.agents,
        wasFetchingAgents: Agents.wasFetching,
        formValues: getFormValues(formSettings.form)(state),
        formErrors: getFormSyncErrors(formSettings.form)(state),
    };
};

export default reduxForm(formSettings)(
    connect(mapStateToProps)(NewSubagentForm)
);
