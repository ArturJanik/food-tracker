import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import Card from '..';

describe('UI Card component', () => {
    it('should render wrapped content', () => {
        // when
        render(<Card>Content to wrap</Card>);

        // then
        expect(screen.getByText('Content to wrap')).toBeVisible();
    });
});
