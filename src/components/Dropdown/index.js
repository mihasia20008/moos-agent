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
        hideDefaultItem: PropTypes.bool,
    };
    static defaultProps = {
        defaultActive: 0,
        list: [],
        defaultText: '',
        hideDefaultItem: false,
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

    renderToggleText() {
        const { activeIndex } = this.state;
        const { list, defaultText, hideDefaultItem } = this.props;

        if (hideDefaultItem) {
            if (activeIndex === 0) {
                return defaultText
            }

            return list[activeIndex].value;
        }

        if (defaultText) {
            return `${defaultText} ${list[activeIndex].value.toLowerCase()}`;
        }

        return list[activeIndex].value;
    }

    render() {
        const { isOpen } = this.state;
        const { list, toggleClassName, disabled, hideDefaultItem } = this.props;

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
                    {this.renderToggleText()}
                </button>
                <div className={cx('dropdown-menu', {
                    'show': isOpen
                })}>{
                    list.map((item, index) => {
                        if (hideDefaultItem && index === 0) {
                            return null;
                        }
                        return (
                            <span
                                key={index}
                                onClick={this.handleSelectItem.bind(this, index)}
                                className={cx('dropdown-item')}
                            >
                                {item.value}
                            </span>
                        );
                    })
                }</div>
            </div>
        );
    }
}

export default Dropdown;
