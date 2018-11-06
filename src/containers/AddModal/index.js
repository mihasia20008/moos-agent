import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class AddModal extends PureComponent {
    static propTypes = { onCloseModal: PropTypes.func.isRequired };

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
    }

    setComponentRef = (item, node) => (this[item] = node);

    render() {
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
                    <div className={cx('modal-menu')} ref={this.setComponentRef.bind(this, 'content')}>
                        <a href="javasctipt::void(0);" className={cx('modal-menu__item')}>
                            <img src="img/new-garantee.svg" alt="" />
                            <span>Новая гарантия</span>
                        </a>
                        <a href="javasctipt::void(0);" className={cx('modal-menu__item')}>
                            <img src="img/rewrite-garantee.svg" alt="" />
                            <span>Перевыпуск гарантии</span>
                        </a>
                    </div>
                    <button type="button" className={cx('close')} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>,
            <div key={1} className={cx('modal-backdrop', 'fade', 'show')} />
        ];
    }
}

export default AddModal;
