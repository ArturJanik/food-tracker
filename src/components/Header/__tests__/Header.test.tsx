import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import Header from '..';

describe('Initial Test of the Header', () => {
    it('should render logo', () => {
        // when
        render(<Header />);

        // then
        expect(screen.getByText('LazyFoodnote')).toBeVisible();
    });

    it('should display settings button', () => {
        // when
        render(<Header />);

        // then
        expect(screen.getByTitle('Settings')).toBeVisible();
    });

    it('should display refresh button', () => {
        // when
        render(<Header />);

        // then
        expect(screen.getByTitle('Refresh Data')).toBeVisible();
    });
});
