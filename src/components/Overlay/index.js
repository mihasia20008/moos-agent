import React from 'react';

import './style.css';

import Spinner from '../Spinner';

const Overlay = () => {
    return (
        <div className="overlay">
            <div className="overlay__wrap">
                <Spinner />
            </div>
        </div>
    );
};

export default Overlay;
