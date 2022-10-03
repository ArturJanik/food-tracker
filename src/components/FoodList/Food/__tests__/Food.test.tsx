import { h } from 'preact';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/preact';
import { Food } from '..';
import { FoodModel } from '../../../../models/Food.model';

describe('Food', () => {
    it('should display food information', () => {
        // given
        const data: FoodModel = {
            id: '6248c1234a567be5b1c4b3d8',
            name: 'Potato',
            unit: 'g',
            amount: 100,
            kcal: 200,
            prot: 5,
        };

        // when
        render(
            <Food data={data} onClick={() => {}} />
        );

        // then
        expect(screen.getByText(/Potato/i)).toBeVisible();
        expect(screen.getByText('200kcal')).toBeVisible();
        expect(screen.getByText('Prot: 5g')).toBeVisible();
    });

    it('should add food note on click', async () => {
        // given
        const user = userEvent.setup();
        const onFoodClickCallback = jest.fn();
        const data: FoodModel = {
            id: '6248c1234a567be5b1c4b3d8',
            name: 'Potato',
            unit: 'g',
            amount: 100,
            kcal: 200,
            prot: 5,
        };
        render(<Food data={data} onClick={onFoodClickCallback} />);

        // when
        await user.click(screen.getByLabelText('100g of Potato'));

        // then
        expect(onFoodClickCallback).toBeCalledTimes(1);
    });
});