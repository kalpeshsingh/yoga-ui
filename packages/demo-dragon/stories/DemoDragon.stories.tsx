/** 3P dependency imports */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

/** component dependencies */
import DemoDragon from '../src/DemoDragon';

/** types **/
import DemoDragonTypes from '../src/DemoDragon.types';

export default {
    title: 'DemoDragon',
    component: DemoDragon,
} as Meta;

const Template: Story<DemoDragonTypes> = (args) => {
    return <DemoDragon {...args} />;
};

export const Sample = Template.bind({});
Sample.args = {
    title: 'Drogon 🐉 welcomes you',
    subtitle: 'Yoga UI is an open source design system for dev community to build side projects quickly',
};
