/** 3P dependency imports */
import React from 'react';

/** types **/
import DemoDragonTypes from './DemoDragon.types';

const DemoDragon: React.FC<DemoDragonTypes> = ({ title, subtitle }) => (
    <div>
        <div>{title}</div>
        <div>{subtitle}</div>
    </div>
);

export default DemoDragon;
