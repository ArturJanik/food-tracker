import { h, Fragment, FunctionalComponent } from 'preact';
import { useStore } from '@nanostores/preact';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/preact';
import Header from '..';
import Sidebar from '../../UI/Sidebar';
import { FoodList } from '../../FoodList';
import { foods } from '../../../store/foods';
import { getDummyServer } from '../../../utils/test/dummyApi';

const DummyListing: FunctionalComponent = () => {
    const foodsList = useStore(foods);

    return (
        <>
            <Header />
            <FoodList foods={foodsList} />
        </>
    );
}

describe('Header', () => {
    const server = getDummyServer();

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render logo', () => {
        // when
        render(<Header />);
        const logo = screen.getByText('LazyFoodnote');

        // then
        expect(logo).toBeVisible();
    });

    it('should display settings button', () => {
        // when
        render(<Header />);
        const settingsBtn = screen.getByTitle('Settings');

        // then
        expect(settingsBtn).toBeVisible();
    });

    it('should display refresh button', () => {
        // when
        render(<Header />);
        const refreshBtn = screen.getByTitle('Refresh Data');

        // then
        expect(refreshBtn).toBeVisible();
    });

    it('should display settings on button click', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <Header />
                <Sidebar />
            </>
        );
        const settingsBtn = screen.getByTitle('Settings');

        // when
        await user.click(settingsBtn);

        // then
        await waitFor(() => {
            const modal = screen.getByRole('dialog');
            expect(modal).toBeVisible();
        });
    });

    it('should refresh data on button click', async () => {
        // given
        const user = userEvent.setup();
        render(<DummyListing />);
        const refreshBtn = screen.getByTitle('Refresh Data');

        // then
        expect(screen.queryByText(/Potato/i)).toBeNull();

        // when
        await user.click(refreshBtn);

        // then
        await waitFor(() => {
            const foodItem = screen.getByText(/Potato/i);
            expect(foodItem).toBeVisible();
        });
    });
});
