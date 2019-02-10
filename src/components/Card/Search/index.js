import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Highlighter from 'react-highlight-words';

const SearchCard = ({ id, query, displayName, INN, OGRN, }) => {
    return (
        <div className={cx('autocomplete__item')}>
            <div className={cx('autocomplete__text autocomplete__text--title')}>
                <Highlighter
                    highlightClassName="autocomplete__identity"
                    searchWords={[query]}
                    autoEscape={true}
                    textToHighlight={displayName}
                />
            </div>
            <div className={cx('autocomplete__text')}>
                <span>ИНН:</span> {INN}
            </div>
            <div className={cx('autocomplete__text')}>
                <span>ОГРН:</span> {OGRN}
            </div>
        </div>
    );
};

SearchCard.propTypes = {
    query: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    INN: PropTypes.string,
    OGRN: PropTypes.string,
};

SearchCard.defaultProps = {
    INN: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
    OGRN: '<i style="font-style: italic; color: #ccc;">Не указано</i>',
};

export default SearchCard;
