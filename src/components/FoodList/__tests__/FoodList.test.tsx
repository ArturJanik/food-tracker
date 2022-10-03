import { h, Fragment } from 'preact';
import { render, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { FoodList } from '..';
import { FoodModel } from '../../../models/Food.model';
import { foods as dummyData } from './fakeFoodData';
import Sidebar from '../../UI/Sidebar';

jest.mock('../../../store/settings', () => {
    const stateMock = jest.requireActual('./state.mock');
    return stateMock.mockSettingsStore({ dateString: '10.01.2022' });
});

jest.mock('../../../store/foodnotes', () => {
    const stateMock = jest.requireActual('./state.mock');
    return stateMock.mockFoodnotesStore();
});

describe('FoodList', () => {
    it('should display list of foods, new food button, selected date and name filter', () => {
        // given
        const foods: FoodModel[] = [...dummyData];

        // when
        render(<FoodList foods={foods} />);

        // then
        const selectedDate = screen.getByText('10/1/2022');
        const nameFilter = screen.getByPlaceholderText('enter food name');
        const foodItem1 = screen.getByText(/Potato/i);
        const foodItem2 = screen.getByText(/Cheese/i);
        const newFoodBtn = screen.getByText('Add food');
        expect(selectedDate).toBeVisible();
        expect(nameFilter).toBeVisible();
        expect(foodItem1).toBeVisible();
        expect(foodItem2).toBeVisible();
        expect(newFoodBtn).toBeVisible();
    });

    it('should let user filter list by name', async () => {
        // given
        const user = userEvent.setup();
        const foods: FoodModel[] = [...dummyData];
        render(<FoodList foods={foods} />);
        const nameFilter = screen.getByPlaceholderText('enter food name');

        // when
        await user.click(nameFilter);
        await user.keyboard('pot');
        
        // then
        expect(screen.queryByText(/Potato/i)).toBeVisible();
        expect(screen.queryByText(/Cheese/i)).toBeNull();

        // when
        await user.clear(nameFilter);
        await user.keyboard('che');
        
        // then
        expect(screen.queryByText(/Potato/i)).toBeNull();
        expect(screen.queryByText(/Cheese/i)).toBeVisible();

        // when
        await user.clear(nameFilter);
        await user.keyboard('beef');
        
        // then
        expect(screen.queryByText(/Potato/i)).toBeNull();
        expect(screen.queryByText(/Cheese/i)).toBeNull();
    });

    it('should let user open new food form', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <FoodList foods={[]} />
                <Sidebar />
            </>
        );
        const newFoodBtn = screen.getByText('Add food');

        // when
        await user.click(newFoodBtn);
        
        // then
        await waitFor(() => {
            const newFoodForm = screen.getByRole('dialog');
            expect(newFoodForm).toBeVisible();
        });
    });

    it('should add food note when user clicks on food item', async () => {
        // given
        const foodnotesStoreMock = require('../../../store/foodnotes');
        const user = userEvent.setup();
        const foods: FoodModel[] = [...dummyData];
        render(<FoodList foods={foods} />);
        const foodItem1 = screen.getByText(/Potato/i);

        // when
        await user.click(foodItem1);
        
        // then
        await waitFor(() => {
            expect(foodnotesStoreMock.addNote).toBeCalledTimes(1);
        });
    });
});
