import React from 'react';
import cx from 'classnames';
import Highlighter from 'react-highlight-words';

const SearchCard = ({ query, displayName, INN, OGRN, }) => {
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

export default SearchCard;
