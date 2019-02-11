import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Highlighter from "react-highlight-words";

class ListItem extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        searchQuery: PropTypes.string,
    };

    handleClick = () => {
        const { id, text, onClick } = this.props;
        onClick(id, text);
    };

    render() {
        const { text, searchQuery } = this.props;

        return (
            <div className={cx('dropdown-item')} onClick={this.handleClick}>
                <Highlighter
                    highlightClassName="autocomplete__identity"
                    searchWords={[searchQuery]}
                    autoEscape={true}
                    textToHighlight={text}
                />
            </div>
        );
    }
}

export default ListItem;
