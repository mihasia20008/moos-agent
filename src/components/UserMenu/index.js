import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

class UserMenu extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onLogout: PropTypes.func.isRequired,
    };

    state = { isOpen: false };

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleOutsideClick);
    }
    
    handleToggleMenu = () => {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
            document.removeEventListener('click', this.handleOutsideClick);
        } else {
            this.setState({ isOpen: true });
            document.addEventListener('click', this.handleOutsideClick);
        }
    }

    handleLogout = () => this.props.onLogout();

    handleOutsideClick = ({ target }) => {
        if (this.menu && this.menu.contains(target)) return;     
        this.handleToggleMenu();
    }

    render() {
        const { name } = this.props;
        const { isOpen } = this.state;

        return (
            <div 
                className={cx('fr-user-menu', {
                    'open': isOpen
                })}
                ref={node => { this.menu = node; }}
            >
                <div className={cx('fr-user-menu__dropdown')}>
                    <div className={cx('fr-user-menu__list')}>
                        <Link className={cx('fr-user-menu__item')} to="?restore-password">
                            <i className={cx('icon icon-settings')} />
                            Настройки
                        </Link>
                        <span className={cx('fr-user-menu__item')} onClick={this.handleLogout}>
                            <i className={cx('icon icon-exit')} />
                            Выход
                        </span>
                    </div>
                </div>
                <div className={cx('fr-user-menu__main')} onClick={this.handleToggleMenu}>
                    <div className={cx('fr-user-menu__name')}>
                        <span className={cx('icon icon-user')} />
                        {name}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserMenu;
