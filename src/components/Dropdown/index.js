import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Dropdown extends PureComponent {
    static propsTypes = {
        defaultActive: PropTypes.number,
        name: PropTypes.string.isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string,
        })),
        onSelectItem: PropTypes.func.isRequired,
        toggleClassName: PropTypes.string,
        defaultText: PropTypes.string,
        disabled: PropTypes.bool,
    };
    static defaultProps = {
        defaultActive: 0,
        list: [],
        defaultText: ''
    };

    state = {
        isOpen: false,
        activeIndex: this.props.defaultActive,
    };

    componentWillReceiveProps(nextProps) {
        const { activeIndex: stateActive } = this.state;
        const { defaultActive: propsActive } = nextProps;
        if (stateActive !== propsActive) {
            this.setState({ activeIndex: propsActive });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }
    
    handleToggleDropdown = () => {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
            document.removeEventListener('click', this.handleOutsideClick);
        } else {
            this.setState({ isOpen: true });
            document.addEventListener('click', this.handleOutsideClick);
        }
    };

    handleSelectItem = (index) => {
        const { name, list, onSelectItem } = this.props;
        this.setState({ activeIndex: index, isOpen: false });
        document.removeEventListener('click', this.handleOutsideClick);
        onSelectItem(name, list[index].key, index);
    };

    handleOutsideClick = ({ target }) => {
        if (this.dropdown && this.dropdown.contains(target)) return;     
        this.handleToggleDropdown();
    };

    render() {
        const { isOpen, activeIndex } = this.state;
        const { list, toggleClassName, defaultText, disabled } = this.props;

        return (
            <div className={cx('dropdown', {
                'show': isOpen,
                'disabled': disabled
            })} ref={node => { this.dropdown = node; }}>
                <button
                    onClick={this.handleToggleDropdown}
                    className={cx('btn-dropdown dropdown-toggle', toggleClassName)}
                    type="button"
                    data-toggle="dropdown"
                >
                    {defaultText
                        ? `${defaultText} ${list[activeIndex].value.toLowerCase()}`
                        : list[activeIndex].value}
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
        );
    }
}

export default Dropdown;
