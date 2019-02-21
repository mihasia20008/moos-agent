import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ClientCard from '../../../components/Card/Client';
import Skelet from '../../../components/Card/Skelet';

const ClientsList = ({ list, isLoading, isLoadingNext }) => {
    return (
        <div className={cx('block-list block-list--clients')}>
            {isLoading
                ? [0, 1, 2, 3].map((item, index) => <Skelet key={index} />)
                : list.map((item, index) => {
                    const name = typeof item.displayName !== 'undefined' && item.displayName
                        ? item.displayName
                        : typeof item.shortName !== 'undefined' && item.shortName
                            ? item.shortName
                            : typeof item.fullName !== 'undefined' && item.fullName
                                ? item.fullName
                                : undefined;
                    return <ClientCard
                        key={index}
                        id={item.id}
                        displayName={name}
                        INN={item.INN ? item.INN : undefined}
                        KPP={item.KPP ? item.KPP : undefined}
                        OGRN={item.OGRN ? item.OGRN : undefined}
                    />
                })}
            {isLoadingNext && <Skelet key={list.length + 10} showLoader />}
        </div>
    );
};

ClientsList.propTypes = {
    list: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    isLoadingNext: PropTypes.bool.isRequired
};

export default ClientsList;