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
    };
    static defaultProps = {
        defaultActive: 0,
        list: [],
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
        onSelectItem(name, list[index].key);
    };

    handleOutsideClick = ({ target }) => {
        if (this.dropdown && this.dropdown.contains(target)) return;     
        this.handleToggleDropdown();
    };

    render() {
        const { isOpen, activeIndex } = this.state;
        const { list } = this.props;
        const isDisabled = list.length < 3;

        return (
            <div
                className={cx('main-filter__control main-filter__control--icon-right', {
                    'main-filter__control--disabled': isDisabled
                })}
            >
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
