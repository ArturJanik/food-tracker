import { h } from 'preact';
import { fireEvent, render, screen } from '@testing-library/preact';
import Button from '..';

describe('UI Button component', () => {
    it('should render button text', () => {
        // when
        render(<Button onClick={jest.fn()}>Submit</Button>);

        // then
        expect(screen.getByRole('button')).toHaveTextContent('Submit');
    });

    it('should react to user click', () => {
        // given
        const clickCallback = jest.fn();

        // when
        render(<Button onClick={clickCallback}>Submit</Button>);
        fireEvent.click(screen.getByRole('button'));

        // then
        expect(clickCallback).toHaveBeenCalledTimes(1);
    });
});
