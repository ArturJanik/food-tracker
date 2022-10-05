import { h } from 'preact';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/preact';
import { NameFilter } from '..';

describe('NameFilter', () => {
    it('should display food name filter', () => {
        // when
        render(<NameFilter searchQuery="" onInput={jest.fn()} />);

        // then
        const label = screen.getByText('Filter by name:');
        const input = screen.getByRole('textbox');
        expect(label).toBeVisible();
        expect(input).toBeVisible();
    });

    it('should handle user input', async () => {
        // given
        const user = userEvent.setup();
        const onQueryInput = jest.fn();
        render(<NameFilter searchQuery="" onInput={onQueryInput} />);

        // when
        await user.click(screen.getByRole('textbox'));
        await user.keyboard('potato');

        // then
        expect(onQueryInput).toHaveBeenCalledTimes(6);
    });
});