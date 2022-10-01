import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import Link from '..';

describe('UI Link component', () => {
    it('should render link', () => {
        // when
        render(
            <Link path="http://example.com">Link text</Link>
        );

        // then
        expect(screen.getByRole('link')).toHaveTextContent('Link text');
        expect(screen.getByRole('link')).toHaveAttribute('href', 'http://example.com');
    });
});
