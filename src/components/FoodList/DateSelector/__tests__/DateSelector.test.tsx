import { h } from 'preact';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/preact';
import { DateSelector } from '..';
import { resetStore } from '../../../../store/settings';

const ONE_DAY_IN_MS = 86400000;

describe('DateSelector', () => {
    beforeEach(() => {
        resetStore();
    });

    it('should display current date', () => {
        // given
        const expected = new Date(Date.now()).toLocaleDateString();

        // when
        render(<DateSelector />);
        const selectedDate = screen.getByLabelText('selected date');

        // then
        expect(selectedDate).toHaveTextContent(expected);
    });

    it('should let user change selected day to previous on button click', async () => {
        // given
        const user = userEvent.setup();
        const expected = new Date(Date.now() - ONE_DAY_IN_MS).toLocaleDateString();
        render(<DateSelector />);
        const prevDayBtn = screen.getByLabelText('previous day');
        const selectedDate = screen.getByLabelText('selected date');

        // when
        await user.click(prevDayBtn);

        // then
        await waitFor(() => {
            expect(selectedDate).toHaveTextContent(expected);
        });
    });

    it('should let user change selected day to next on button click', async () => {
        // given
        const user = userEvent.setup();
        const expected = new Date(Date.now() + ONE_DAY_IN_MS).toLocaleDateString();
        render(<DateSelector />);
        const nextDayBtn = screen.getByLabelText('next day');
        const selectedDate = screen.getByLabelText('selected date');

        // when
        await user.click(nextDayBtn);

        // then
        await waitFor(() => {
            expect(selectedDate).toHaveTextContent(expected);
        });
    });
});