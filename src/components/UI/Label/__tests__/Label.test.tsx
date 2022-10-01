import { h, Fragment } from 'preact';
import { render, screen } from '@testing-library/preact';
import Label from '..';

describe('UI Label component', () => {
    it('should render label text', () => {
        // when
        render(
            <>
                <Label forInputId="field-id">E-mail address</Label>
                <input id="field-id" name="field-id" />
            </>
        );

        // then
        expect(screen.getByLabelText('E-mail address')).toBeVisible();
    });
});
