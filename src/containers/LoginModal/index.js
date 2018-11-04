import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

class LoginModal extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        topPosition: PropTypes.bool,
        centerPosition: PropTypes.bool,
    };

    componentDidMount() {
        document.body.classList.add('modal-open');
        this.modal.classList.add('show');
    }

    componentWillUnmount() {
        this.modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }

    setComponentRef = node => (this.modal = node);

    render() {
        const { children, topPosition, centerPosition } = this.props;

        return [
            <div key={0} className={cx('modal-custom', {
                'modal-custom--empty restore-pass-form': centerPosition,
            })}>
                <div
                    ref={this.setComponentRef}
                    className={cx('modal', 'fade', {
                        'bd-example-modal-lg': topPosition,
                    })}
                    id="exampleModalCenter"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className={cx('modal-dialog', {
                        'modal-dialog-centered': centerPosition,
                        'modal-lg': topPosition,
                    })} role="document">
                        <div className={cx('modal-content')}>
                            {children}
                        </div>
                    </div>
                    <Link to="/" className={cx('close')} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </Link>
                </div>
            </div>,
            <div key={1} className={cx('modal-backdrop', 'fade', 'show')} />
        ];
    }
}

export default LoginModal;
