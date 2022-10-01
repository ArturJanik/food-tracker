import { h, Fragment} from 'preact';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/preact';
import Sidebar from '..';
import { runSidebar } from '../../../../store/sidebar';

describe('UI Sidebar component', () => {
    it('should display content when user opens sidebar', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <div onClick={() => runSidebar(<p>Sidebar content</p>)}>Open sidebar</div>
                <Sidebar />
            </>
        );

        // when
        await user.click(screen.getByText('Open sidebar'));

        // then
        await waitFor(() => {
            expect(screen.getByText('Sidebar content')).toBeVisible();
        });
    });

    it('should hide sidebar when user clicks on overlay', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <div onClick={() => runSidebar(<p>Sidebar content</p>)}>Open sidebar</div>
                <Sidebar />
            </>
        );

        // when
        await user.click(screen.getByText('Open sidebar'));

        // then
        await waitFor(() => {
            expect(screen.getByText('Sidebar content')).toBeVisible();
        });

        // when
        await user.click(screen.getByRole('dialog'));

        // then
        await waitFor(() => {
            expect(screen.queryByText('Sidebar content')).toBeNull();
        });
    });
});
