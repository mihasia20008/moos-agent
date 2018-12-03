import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ClientCard from '../../../components/Card/Client';
import Skeket from '../../../components/Card/Skelet';

const ClientsList = ({ idsList, list, isLoading, isLoadingNext }) => {
    return (
        <div className={cx('block-list block-list--clients')}>
            {isLoading
                ? [0, 1, 2, 3].map((item, index) => <Skeket key={index} />)
                : idsList.map(id => {
                    const name = typeof list[id].displayName !== 'undefined' && list[id].displayName
                        ? list[id].displayName
                        : typeof list[id].shortName !== 'undefined' && list[id].shortName
                            ? list[id].shortName
                            : typeof list[id].fullName !== 'undefined' && list[id].fullName
                                ? list[id].fullName
                                : undefined;
                    return <ClientCard
                        key={id}
                        id={id}
                        displayName={name}
                        INN={list[id].INN ? list[id].INN : undefined}
                        KPP={list[id].KPP ? list[id].KPP : undefined}
                        OGRN={list[id].OGRN ? list[id].OGRN : undefined}
                    />
                })}
            {isLoadingNext && <Skeket key={idsList.length + 10} showLoader />}
        </div>
    );
};

ClientsList.propTypes = {
    idsList: PropTypes.array,
    list: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isLoadingNext: PropTypes.bool.isRequired
};

export default ClientsList;