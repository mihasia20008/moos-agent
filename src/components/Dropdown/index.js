import React, { PureComponent } from 'react';
import cx from 'classnames';

class Dropdown extends PureComponent {
    state = {
        isOpen: false,
        activeIndex: this.props.defaultActive || 0,
    };

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleOutsideClick);
    }
    
    handleToggleDropdown = () => {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
            document.removeEventListener('click', this.handleOutsideClick);
        } else {
            this.setState({ isOpen: true });
            document.addEventListener('click', this.handleOutsideClick);
        }
    }

    handleSelectItem = (index) => {
        const { name, list, onSelectItem } = this.props;
        this.setState({ activeIndex: index, isOpen: false });
        document.removeEventListener('click', this.handleOutsideClick);
        onSelectItem(name, list[index].key);
    }

    handleOutsideClick = ({ target }) => {
        if (this.dropdown && this.dropdown.contains(target)) return;     
        this.handleToggleDropdown();
    }

    render() {
        const { isOpen, activeIndex } = this.state;
        const { list } = this.props;

        return (
            <div className={cx('main-filter__control main-filter__control--icon-right')}>
                <div className={cx('dropdown', {
                    'show': isOpen
                })} ref={node => { this.dropdown = node; }}>
                    <button
                        onClick={this.handleToggleDropdown}
                        className={cx('btn btn-dropdown dropdown-toggle btn-dropdown--hidden-border')}
                        type="button"
                        data-toggle="dropdown"
                    >
                        {list[activeIndex].value}
                    </button>
                    <div className={cx('dropdown-menu', {
                        'show': isOpen
                    })}>{
                        list.map((item, index) => (
                            <span
                                key={index}
                                onClick={this.handleSelectItem.bind(this, index)}
                                className={cx('dropdown-item')}
                            >
                                {item.value}
                            </span>
                        ))
                    }</div>
                </div>
                <i className={cx('icon icon-chevron-down')} />
            </div>
        );
    }
}

export default Dropdown;
