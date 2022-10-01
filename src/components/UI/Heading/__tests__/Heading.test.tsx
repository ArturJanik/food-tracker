import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import Heading, { HeadingSize } from '..';

describe('UI Heading component', () => {
    it.each([
        ['h1'],
        ['h2'],
        ['h3'],
        ['h4'],
        ['h5'],
        ['h6'],
    ])('should render heading with size %p', (headingSize: string) => {
        // when
        render(<Heading size={headingSize as HeadingSize}>Content to wrap</Heading>);

        // then
        expect(screen.getByRole('heading')).toHaveTextContent('Content to wrap');
    });
});
