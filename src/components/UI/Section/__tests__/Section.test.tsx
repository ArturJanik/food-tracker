import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import Section from '..';

describe('UI Section component', () => {
    it('should render text content', () => {
        // when
        render(
            <Section>Content text</Section>
        );

        // then
        expect(screen.getByText('Content text')).toBeVisible();
    });
});
