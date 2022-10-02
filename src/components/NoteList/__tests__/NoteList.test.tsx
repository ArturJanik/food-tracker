import { h } from 'preact';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/preact';
import NoteList from '..';

jest.mock('../../../store/foodnotes', () => {
    const stateMock = jest.requireActual('./state.mock');
    return stateMock.mockFoodnotesStore();
});

jest.mock('../../../store/settings', () => {
    const stateMock = jest.requireActual('./state.mock');
    return stateMock.mockSettingsStore();
});

describe('NoteList', () => {
    it('should display all food notes list when user clicks button', async () => {
        // given
        render(<NoteList />);

        // then
        await waitFor(() => {
            expect(screen.getByText('2/4/2022 foods')).toBeVisible();
            expect(screen.getByText('Potato (100g)')).toBeVisible();
            expect(screen.getByText('Not potato (20g)')).toBeVisible();
        });
    });

    it('should remove food when remove link is clicked', async () => {
        // given
        const foodnotesStoreMock = require('../../../store/foodnotes');
        const user = userEvent.setup();
        render(<NoteList />);

        // when
        await user.click(screen.getAllByRole('button')[0]);

        // then
        await waitFor(() => {
            expect(foodnotesStoreMock.removeNote).toBeCalledTimes(1);
        });
    });
});