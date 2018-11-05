import React, { PureComponent } from 'react';
import cx from 'classnames';

import ClientCard from '../../../components/Card/Client';

const list = [0, 1, 2, 3];

class ClientsList extends PureComponent {
    render() {
        return (
            <div className={cx('block-list block-list--clients')}>{
                list.map((item, index) => <ClientCard key={index} />)
            }</div>
        );
    }
}

export default ClientsList;
