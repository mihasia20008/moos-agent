import React, { PureComponent } from 'react';
import cx from 'classnames';

import AgentsStatsPanel from '../../components/StatsPanel/Agents';

class Agents extends PureComponent {
    render() {
        return (
            <section className={cx('fr-content')}>
                <AgentsStatsPanel />
                Agent
            </section>
        );
    }
}

export default Agents;
