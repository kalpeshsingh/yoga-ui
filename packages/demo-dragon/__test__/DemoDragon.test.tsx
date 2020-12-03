/** 3P dependency imports */
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

/** component dependencies */
import DemoDragon from '../src/DemoDragon';

/** types **/
import DemoDragonTypes from '../src/DemoDragon.types';

describe('DemoDragon Component', () => {
    const props: DemoDragonTypes = {
        title: 'This is my cool title',
        subtitle: 'This is my uncool subtitle',
    };

    it('should have title and subtitle prop', () => {
        const { getByText } = render(<DemoDragon {...props} />);

        expect(getByText(props.title)).toBeDefined();
        expect(getByText(props.subtitle || '')).toBeDefined();
    });

    it('should not have basic accessibility violations', async () => {
        const { container } = render(<DemoDragon {...props} />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
