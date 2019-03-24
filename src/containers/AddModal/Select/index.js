import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';

import { authenticationUser } from "../../../redux/User/actions";

class AddModalSelect extends PureComponent {
    static propTypes = {
        processDefinitionKeys: PropTypes.array,
        onCloseModal: PropTypes.func.isRequired,
        onProgrammingRedirect: PropTypes.func.isRequired
    };

    componentDidMount() {
        document.body.classList.add('modal-open');
        this.modal.classList.add('show');
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        this.modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleOutsideClick = (event) => {
        if (this.content && this.content.contains(event.target)) return;     
        this.props.onCloseModal();
    };

    handleOpenForm = ({ currentTarget }) => {
        const { processKey } = currentTarget.dataset;
        const { onProgrammingRedirect, dispatch } = this.props;
        dispatch(authenticationUser(true))
            .then(() => onProgrammingRedirect(`?add-modal=${processKey}`))
            .catch(err => console.log(err));
    };

    setComponentRef = (item, node) => (this[item] = node);

    render() {
        const { processDefinitionKeys } = this.props;
        return [
            <div key={0} className={cx('modal-custom')}>
                <div
                    ref={this.setComponentRef.bind(this, 'modal')}
                    className={cx('modal bd-example-modal-lg fade')}
                    id="optionsModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="optionsModalLabel"
                    aria-hidden="true"
                >
                    <div className={cx('modal-menu')} ref={this.setComponentRef.bind(this, 'content')}>{
                        processDefinitionKeys.map(process => (
                            <button
                                key={process.process_definition_key}
                                type="button"
                                className={cx('modal-menu__item')}
                                data-process-key={process.process_definition_key}
                                onClick={this.handleOpenForm}
                            >
                                {process.process_type === 'bankguarantee'
                                    ? (
                                        <img src="static/media/new-garantee.svg" alt="" />
                                    ) : (
                                        <img src="static/media/rewrite-garantee.svg" alt="" />
                                    )}
                                <span>{process.process_name}</span>
                            </button>
                        ))
                    }</div>
                    <button type="button" className={cx('close')} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>,
            <div key={1} className={cx('modal-backdrop', 'fade', 'show')} />
        ];
    }
}

const mapStateToProps = ({ User }) => {
    return {
        processDefinitionKeys: User.processDefinitionKeys,
    };
};

export default connect(mapStateToProps)(AddModalSelect);
