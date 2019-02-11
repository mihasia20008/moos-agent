import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import SearchCard from '../../../components/Card/Search';

import { searchByString, clearSearchResults } from '../../../redux/Search/actions';

class FormSearch extends PureComponent {
    static propTypes = {
        defaultSearch: PropTypes.string,
        list: PropTypes.array.isRequired,
        session_id: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    static defaultProps = { defaultSearch: '' };

    state = {
        search: this.props.defaultSearch,
        isFilled: this.props.defaultSearch.length > 2,
    };

    componentDidMount() {
        const { defaultSearch, session_id, dispatch } = this.props;
        if (defaultSearch.length > 2) {
            dispatch(searchByString(session_id, defaultSearch));
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(clearSearchResults());
    }

    handleSearchType = ({ target: { value } }) => {
        const { session_id, dispatch } = this.props;
        this.setState({
            search: value,
            isFilled: value.length > 2,
        });
        if (value.length > 2) {
            dispatch(searchByString(session_id, value));
        }
    };

    render() {
        const { search, isFilled } = this.state;
        const { list } = this.props;

        return (
            <form className={cx('form-search', {
                'filled': isFilled,
            })}>
                <div className={cx('form-group form-search__row')}>
                    <svg className={cx('icon-search')} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#FFF" fillRule="evenodd" d="M18.462 0c10.175 0 18.461 8.286 18.461 18.462 0 4.42-1.55 8.473-4.154 11.653l14.712 14.712-2.654 2.654-14.712-14.712a18.318 18.318 0 0 1-11.653 4.154C8.286 36.923 0 28.637 0 18.462 0 8.286 8.286 0 18.462 0zm0 3.692a14.742 14.742 0 0 0-14.77 14.77c0 8.177 6.592 14.769 14.77 14.769 8.177 0 14.769-6.592 14.769-14.77 0-8.177-6.592-14.769-14.77-14.769z" />
                    </svg>
                    <input
                        value={search}
                        type="text"
                        className={cx('form-control')}
                        id="search"
                        aria-describedby="search"
                        placeholder="Поиск"
                        autoComplete="false"
                        onChange={this.handleSearchType}
                    />
                    <svg className={cx('icon-prelouder')} xmlns="http://www.w3.org/2000/svg" width="47" height="32" viewBox="0 0 24 16">
                        <g fill="none" fillRule="nonzero">
                            <path fill="#4A4A4A" d="M4.286 7.333c-.972 0-1.81 1.052-2.144 2.112-.539 1.713.545 3.893 1.776 4.41 1.528.64 2.852-1.025 3.101-1.365.338-.461.665-.941.981-1.431-.604-.972-1.175-1.888-1.86-2.642-.435-.477-1.1-1.053-1.797-1.083h-.057m6.38 3.815c.835 1.158 1.717 2.151 2.937 2.603 2.279.845 4.824-.605 6.226-2.31A9.522 9.522 0 0 0 22 5.602c.024-1.277-.35-2.84-1.473-3.394-1.28-.63-2.992.276-4.166 1.335-1.869 1.687-3.224 3.79-4.658 6.017-.339.526-.682 1.059-1.035 1.59M14.979 16a5.923 5.923 0 0 1-2.082-.373c-1.478-.55-2.526-1.577-3.423-2.737-.218.298-.442.593-.672.882-1.199 1.507-3.284 2.805-5.54 1.932-2.406-.93-3.872-4.182-3.016-6.69.573-1.68 2.159-3.427 4.265-3.367 1.112.043 2.198.594 3.228 1.637.648.655 1.197 1.397 1.713 2.143.19-.294.38-.59.566-.882 1.444-2.257 2.937-4.591 5.004-6.47C17.18.117 19.576-.502 21.436.42c1.65.819 2.609 2.762 2.562 5.198a11.583 11.583 0 0 1-2.61 7.077C19.942 14.463 17.51 16 14.979 16" />
                            <path fill="#9B9B9B" d="M4.772 16c-.48 0-.975-.086-1.48-.282a.967.967 0 0 1-.556-1.26c.2-.5.774-.744 1.282-.549 1.602.62 2.992-.992 3.254-1.321 1.002-1.263 1.903-2.672 2.773-4.035 1.444-2.26 2.936-4.595 5.002-6.475C17.203.116 19.599-.504 21.457.42a.964.964 0 0 1 .436 1.306.996.996 0 0 1-1.327.43c-1.285-.64-3 .278-4.177 1.35-1.874 1.704-3.232 3.83-4.67 6.08-.897 1.405-1.825 2.857-2.89 4.198C7.9 14.954 6.437 16 4.773 16" />
                        </g>
                    </svg>
                </div>
                <div className={cx('autocomplete autocomplete--search')}>{
                    list.map(item => (
                        <SearchCard
                            key={item.id}
                            query={search}
                            id={item.id}
                            displayName={item.displayName}
                            INN={item.INN}
                            OGRN={item.OGRN}
                        />
                    ))
                }</div>
                {/* <div className={cx('button-container')}>
                    <button className={cx('btn btn-light btn-lg')} onClick={() => alert('Клиент был добавлен')}>
                        <i className={cx('icon icon-user')} />
                        Добавить клиента
                    </button>
                </div> */}
            </form>
        );
    }
}

const mapStateToProp = ({ User, Search }) => {
    return {
        session_id: User.session_id,
        list: Search.list,
    };
};

export default connect(mapStateToProp)(FormSearch);
