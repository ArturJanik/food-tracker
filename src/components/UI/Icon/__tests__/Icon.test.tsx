import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import Icon from '..';

describe('UI Icon component', () => {
    it('should render icon image with default alt text', () => {
        // when
        render(<Icon type="calendar" />);

        // then
        expect(screen.getByRole('img')).toBeVisible();
        expect(screen.getByAltText('calendar')).toBeVisible();
    });

    it('should render icon with custom alt text', () => {
        // when
        render(<Icon type="calendar" alt="not calendar" />);

        // then
        expect(screen.getByAltText('not calendar')).toBeVisible();
    });
});
