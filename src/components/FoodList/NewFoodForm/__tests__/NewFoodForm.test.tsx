import { h } from 'preact';
import { render, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { NewFoodForm } from '..';

describe('NewFoodForm', () => {
    it('should display new food creation form', () => {
        // when
        render(<NewFoodForm />);

        // then
        expect(screen.getByText('Create new food')).toBeVisible();
        expect(screen.getByPlaceholderText('Food name')).toBeVisible();
        expect(screen.getByPlaceholderText('Amount')).toBeVisible();
        expect(screen.getByPlaceholderText('Unit')).toBeVisible();
        expect(screen.getByPlaceholderText('kcal')).toBeVisible();
        expect(screen.getByPlaceholderText('g of protein')).toBeVisible();
    });
    
    it('should validate each field on save', async () => {
        // given
        const user = userEvent.setup();
        render(<NewFoodForm />);
        const saveBtn = screen.getByText('Save');
        const nameInput = screen.getByPlaceholderText('Food name');
        const amountInput = screen.getByPlaceholderText('Amount');
        const unitInput = screen.getByPlaceholderText('Unit');
        const kcalInput = screen.getByPlaceholderText('kcal');
        const protInput = screen.getByPlaceholderText('g of protein');

        // when
        await user.click(nameInput);
        await user.keyboard('Potato');
        await user.click(saveBtn);

        // then
        await waitFor(() => {
            const errorMsg = screen.getByText('One or more fields is invalid');
            expect(errorMsg).toBeVisible();
        });

        // when
        await user.click(amountInput);
        await user.keyboard('100,5');
        await user.click(saveBtn);

        // then
        await waitFor(() => {
            const errorMsg = screen.getByText('One or more fields is invalid');
            expect(errorMsg).toBeVisible();
        });

        // when
        await user.click(unitInput);
        await user.keyboard('g');
        await user.click(saveBtn);

        // then
        await waitFor(() => {
            const errorMsg = screen.getByText('One or more fields is invalid');
            expect(errorMsg).toBeVisible();
        });

        // when
        await user.click(kcalInput);
        await user.keyboard('2');
        await user.keyboard('{Backspace}');
        await user.click(saveBtn);

        // then
        await waitFor(() => {
            const errorMsg = screen.getByText('One or more fields is invalid');
            expect(errorMsg).toBeVisible();
        });

        // when
        await user.click(kcalInput);
        await user.keyboard('200');
        await user.click(saveBtn);

        // then
        await waitFor(() => {
            const errorMsg = screen.queryByText('One or more fields is invalid');
            expect(errorMsg).toBeNull();
        });

        // when
        await user.click(protInput);
        await user.keyboard('6.5');
        await user.keyboard('{Backspace}{Backspace}{Backspace}');
        await user.click(saveBtn);

        // then
        await waitFor(() => {
            const errorMsg = screen.getByText('One or more fields is invalid');
            expect(errorMsg).toBeVisible();
        });

        // when
        await user.click(protInput);
        await user.keyboard('6.5');
        await user.click(saveBtn);

        // then
        await waitFor(() => {
            const errorMsg = screen.queryByText('One or more fields is invalid');
            expect(errorMsg).toBeNull();
        });
    });
});