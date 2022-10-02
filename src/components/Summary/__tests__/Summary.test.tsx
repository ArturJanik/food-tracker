import { h, Fragment } from 'preact';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/preact';
import Summary from '..';
import Sidebar from '../../UI/Sidebar';

describe('Summary', () => {
    it('should display all food notes list when user clicks button', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <Summary />
                <Sidebar />
            </>
        );

        // when
        await user.click(screen.getByText('All notes'));

        // then
        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeVisible();
        });
    });

    it('should display noted kcal intake compared to goal', async () => {
        // given
        render(<Summary />);

        // then
        expect(screen.getByText('Kcal: 0/1600kcal')).toBeVisible();
    });

    it('should display noted protein intake compared to goal', async () => {
        // given
        render(<Summary />);

        // when
        expect(screen.getByText('Prot: 0/140g')).toBeVisible();
    });
});
