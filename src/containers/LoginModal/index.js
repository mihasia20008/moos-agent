import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

class LoginModal extends PureComponent {
    render() {
        return [
            <div key={0} className={cx('modal-custom', 'modal-custom--empty', 'restore-pass-form')}>
                <div
                    className={cx('modal', 'fade', 'show')}
                    id="exampleModalCenter"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className={cx('modal-dialog', 'modal-dialog-centered')} role="document">
                        <div className={cx('modal-content')}>
                            {this.props.children}
                        </div>
                    </div>
                    <Link to="/" className={cx('close', 'show')} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </Link>
                </div>
            </div>,
            <div key={1} className={cx('modal-backdrop', 'fade', 'show')} />
        ];
    }
}

export default LoginModal;
