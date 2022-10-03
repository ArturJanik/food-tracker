import { h, Fragment } from 'preact';
import { render, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { NewFoodTile } from '..';
import Sidebar from '../../../UI/Sidebar';

describe('NewFoodTile', () => {
    it('should open new food form on click', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <NewFoodTile />
                <Sidebar />
            </>
        );

        // then
        expect(screen.queryByRole('dialog')).toBeNull();

        // when
        await user.click(screen.getByRole('button'));

        // then
        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeVisible();
        });
    });
});