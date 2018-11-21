import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Modal extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onCloseModal: PropTypes.func.isRequired,
        topPosition: PropTypes.bool,
        centerPosition: PropTypes.bool,
        modalClass: PropTypes.string,
        dialogClass: PropTypes.string,
        contentClass: PropTypes.string,
    };
    static defaultProps = { 
        modalClass: '',
        dialogClass: '',
        contentClass: '',
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
    }

    setComponentRef = (item, node) => (this[item] = node);

    render() {
        const { children, topPosition, centerPosition, modalClass, dialogClass, contentClass } = this.props;

        return [
            <div key={0} className={cx('modal-custom', modalClass, {
                'modal-custom--empty': centerPosition,
            })}>
                <div
                    ref={this.setComponentRef.bind(this, 'modal')}
                    className={cx('modal', 'fade', {
                        'bd-example-modal-lg': topPosition,
                    })}
                    id="exampleModalCenter"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className={cx('modal-dialog', dialogClass, {
                        'modal-dialog-centered': centerPosition,
                        'modal-lg': topPosition,
                    })} role="document">
                        <div className={cx('modal-content', contentClass)} ref={this.setComponentRef.bind(this, 'content')}>
                            {children}
                        </div>
                    </div>
                    <button type="button" className={cx('close')} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>,
            <div key={1} className={cx('modal-backdrop', 'fade', 'show')} />
        ];
    }
}

export default Modal;
