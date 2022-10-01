import { h, Fragment} from 'preact';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/preact';
import Modal from '..';
import { runModal } from '../../../../store/modal';

describe('UI Modal component', () => {
    it('should render content when user opens modal', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <div onClick={() => runModal('Modal text', () => {})}>Open modal</div>
                <Modal />
            </>
        );

        // when
        await user.click(screen.getByText('Open modal'));

        // then
        await waitFor(() => {
            expect(screen.getByText('Modal text')).toBeVisible();
        });
    });

    it('should hide modal when user clicks on overlay', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <div onClick={() => runModal('Modal text', () => {})}>Open modal</div>
                <Modal />
            </>
        );

        // when
        await user.click(screen.getByText('Open modal'));

        // then
        await waitFor(() => {
            expect(screen.getByText('Modal text')).toBeVisible();
        });

        // when
        await user.click(screen.getByRole('dialog'));

        // then
        await waitFor(() => {
            expect(screen.queryByText('Modal text')).toBeNull();
        });
    });

    it('should hide modal when user clicks on cancel button', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <div onClick={() => runModal('Modal text', () => {})}>Open modal</div>
                <Modal />
            </>
        );

        // when
        await user.click(screen.getByText('Open modal'));

        // then
        await waitFor(() => {
            expect(screen.getByText('Modal text')).toBeVisible();
        });

        // when
        await user.click(screen.getByText('Cancel'));

        // then
        await waitFor(() => {
            expect(screen.queryByText('Modal text')).toBeNull();
        });
    });

    it('should hide modal when user clicks on confirm button', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <div onClick={() => runModal('Modal text', () => {})}>Open modal</div>
                <Modal />
            </>
        );

        // when
        await user.click(screen.getByText('Open modal'));

        // then
        await waitFor(() => {
            expect(screen.getByText('Modal text')).toBeVisible();
        });

        // when
        await user.click(screen.getByText('Confirm'));

        // then
        await waitFor(() => {
            expect(screen.queryByText('Modal text')).toBeNull();
        });
    });
});
