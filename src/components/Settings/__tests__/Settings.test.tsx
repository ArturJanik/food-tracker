import { h, Fragment } from 'preact';
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import Settings from '..';
import Summary from '../../Summary';

describe('Settings', () => {
    it('should display section title and form', () => {
        // when
        render(<Settings />);
        const title = screen.getByText('Settings');
        const dailyKcalSettingLabel = screen.getByLabelText('Daily kcal goal');
        const dailyProtSettingLabel = screen.getByLabelText('Daily prot goal');
        const dailyKcalSettingInput = screen.getByPlaceholderText('Set daily kcal goal');
        const dailyProtSettingInput = screen.getByPlaceholderText('Set daily prot goal');

        // then
        expect(title).toBeVisible();
        expect(dailyKcalSettingLabel).toBeVisible();
        expect(dailyProtSettingLabel).toBeVisible();
        expect(dailyKcalSettingInput).toBeVisible();
        expect(dailyProtSettingInput).toBeVisible();
    });

    it('should let user set his kcal and protein goal', async () => {
        // given
        const user = userEvent.setup();
        render(
            <>
                <Settings />
                <Summary />
            </>
        );

        // when
        const dailyKcalSettingInput = screen.getByPlaceholderText('Set daily kcal goal');
        const dailyProtSettingInput = screen.getByPlaceholderText('Set daily prot goal');
        await user.click(dailyKcalSettingInput);
        await user.clear(dailyKcalSettingInput);
        await user.keyboard('900');
        await user.click(dailyProtSettingInput);
        await user.clear(dailyProtSettingInput);
        await user.keyboard('125');

        // then
        expect(screen.getByText('Kcal: 0/900kcal')).toBeVisible();
        expect(screen.getByText('Prot: 0/125g')).toBeVisible();
    });
});
