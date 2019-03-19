import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from "classnames";

import ClearButton from "../ClearButton";
import ListItem from './blocks/ListItem';

import { searchByString, clearSearchResults } from "../../redux/Search/actions";

class TextFieldWithAutoComplete extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        classNames: PropTypes.shape({
            container: PropTypes.string,
            input: PropTypes.string
        }),
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        }),
    };

    static defaultProps = {
        placeholder: '',
        value: '',
        classNames: {
            container: '',
            input: '',
            error: ''
        },
        meta: {
            touched: false,
            error: ''
        }
    };

    state = {
        value: this.props.value,
        showResult: false,
    };

    handleClearField = () => {
        const { name, onClear, dispatch } = this.props;
        this.setState({ value: '' });
        onClear(name, '');
        dispatch(clearSearchResults());
    };

    handleFocusInput = () => {
        this.handleClearField();
        document.addEventListener('click', this.handleOutsideClick);
    };

    handleOutsideClick = ({ target }) => {
        if (this.textField && this.textField.contains(target)) return;
        this.handleToggleResults();
    };

    handleToggleResults = () => {
        const { dispatch } = this.props;
        dispatch(clearSearchResults());
        this.setState({ showResult: false });
    };

    handleTypeValue = ({ target }) => {
        const { value } = target;

        const showResult = !!value.length;
        const { session_id, dispatch } = this.props;
        this.setState({ value, showResult: showResult });

        if (showResult) {
            dispatch(searchByString(session_id, value));
        } else {
            dispatch(clearSearchResults());
        }
    };

    handleSelectItem = (id, value) => {
        const { name, onSelect } = this.props;
        this.setState({ value, showResult: false });
        onSelect(name, id);
    };

    renderSearchResults() {
        const { list } = this.props;
        const { showResult, value } = this.state;

        if (!(list.length && showResult)) {
            return null;
        }

        return (
            <div className={cx('dropdown-menu', 'show')}>{
                list.map(item => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        text={item.displayName}
                        searchQuery={value}
                        onClick={this.handleSelectItem}
                    />
                ))
            }</div>
        );
    }

    render() {
        const { name, classNames, placeholder, meta: { touched, error } } = this.props;
        const { value } = this.state;

        return (
            <div
                className={classNames.container}
                ref={node => { this.textField = node; }}
            >
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className={classNames.input}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onFocus={this.handleFocusInput}
                        onChange={this.handleTypeValue}
                    />
                    <ClearButton
                        onClear={this.handleClearField}
                        isHidden={!value.length}
                    />
                    {this.renderSearchResults()}
                </div>
                {touched && error && <span className={classNames.error}>{error}</span>}
            </div>
        );
    }
}

const mapStateToProp = ({ User, Search }) => {
    return {
        session_id: User.session_id,
        list: Search.list,
    };
};

export default connect(mapStateToProp)(TextFieldWithAutoComplete);
