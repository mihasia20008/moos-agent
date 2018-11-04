import React from 'react';

import Sidebar from '../../containers/Sidebar';

const Tasks = () => {
    return [
        <Sidebar key={0} />,
        <div key={1}>Tasks</div>
    ];
};

export default Tasks;
