import React from 'react';
import cx from 'classnames';

import Sidebar from '../../containers/Sidebar';
import ClientsFilter from '../../containers/Filter/Clients';
import ClientsList from '../../containers/List/Clients';
import ClientsStats from '../../components/ClientsStats';

const Clients = () => {
    return [
        <Sidebar key={0} />,
        <section key={1} className={cx('fr-content')}>
            <ClientsFilter />
            <ClientsStats />
            <ClientsList />
        </section>
    ];
};

export default Clients;
