import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import Input from '..';

describe('UI Input component', () => {
    it.each([
        ['text', 'Text field placeholder'],
        ['email', 'Email field placeholder'],
        ['password', 'Password field placeholder'],
        ['number', 'Number field placeholder'],
        ['date', 'Date field placeholder'],
    ])('should render %p input field', (type, placeholder) => {
        // when
        render(
            <Input
                type={type as any}
                id=""
                name=""
                onInput={jest.fn()}
                placeholder={placeholder}
            />
        );

        // then
        expect(screen.getByPlaceholderText(placeholder)).toBeVisible();
    });

    describe('text input field', () => {
        it('should validate input pattern', async () => {
            // given
            const user = userEvent.setup();
            render(
                <Input
                    type="text"
                    pattern="[A-Za-z]{3}"
                    id=""
                    name=""
                    onInput={jest.fn()}
                />
            );
            const field = screen.getByRole('textbox');

            // when
            await user.click(field);
            await user.keyboard('AbC');

            // then
            expect(field).toBeValid();

            // when
            await user.clear(field);
            await user.keyboard('AbCd');

            // then
            expect(field).toBeInvalid();

            // when
            await user.clear(field);
            await user.keyboard('123');

            // then
            expect(field).toBeInvalid();
        });

        it('should validate if input is required', async () => {
            // given
            const user = userEvent.setup();
            render(
                <Input
                    type="text"
                    id=""
                    name=""
                    onInput={jest.fn()}
                    required
                />
            );
            const field: HTMLInputElement = screen.getByRole('textbox');

            // when
            await user.click(field);

            // then
            expect(field).toBeInvalid();

            // when
            await user.keyboard('a');

            // then
            expect(field).toBeValid();

            // when
            await user.keyboard('{Backspace}');

            // then
            expect(field).toBeInvalid();
        });

        it('should handle user input', async () => {
            // given
            const user = userEvent.setup();
            const inputCallback = jest.fn();
            const keydownCallback = jest.fn();
            render(
                <Input
                    type="text"
                    id=""
                    name=""
                    onInput={inputCallback}
                    onKeyDown={keydownCallback}
                />
            );
            const field: HTMLInputElement = screen.getByRole('textbox');
    
            // when
            await user.click(field);
            await user.keyboard('a');
    
            // then
            expect(inputCallback).toHaveBeenCalledTimes(1);
            expect(keydownCallback).toHaveBeenCalledTimes(1);
        });

        // TODO: for some reason this is not working, it looks that checkValidity() method returns "true" 
        // when it should fail (input outside of min- and maxLength boundaries)
        // - to investigate in future
        //
        // it('should validate min and max length of input', async () => {
        //     // given
        //     const user = userEvent.setup();
        //     render(
        //         <Input
        //             type="text"
        //             id=""
        //             name=""
        //             onInput={() => {}}
        //             minLength={2}
        //             maxLength={3}
        //         />
        //     );
        //     const field: HTMLInputElement = screen.getByRole('textbox');

        //     // when
        //     await user.click(field);
        //     await user.keyboard('a');

        //     // then
        //     expect(field).toBeInvalid();

        //     // when
        //     await user.keyboard('b');

        //     // then
        //     expect(field).toBeValid();

        //     // when
        //     await user.keyboard('c');

        //     // then
        //     expect(field).toBeValid();

        //     // when
        //     await user.keyboard('d');

        //     // then
        //     expect(field).toBeInvalid();
        // });
    });

    describe('email input field', () => {
        it('should validate if input is valid email', async () => {
            // given
            const user = userEvent.setup();
            render(
                <Input
                    type="email"
                    id=""
                    name=""
                    onInput={jest.fn()}
                />
            );
            const field: HTMLInputElement = screen.getByRole('textbox');

            // when
            await user.click(field);
            await user.keyboard('abcdef.com');

            // then
            expect(field).toBeInvalid();

            // when
            await user.clear(field);
            await user.keyboard('abc@');

            // then
            expect(field).toBeInvalid();

            // when
            await user.clear(field);
            await user.keyboard('abcdef@example.com');

            // then
            expect(field).toBeValid();
        });

        it('should handle user input', async () => {
            // given
            const user = userEvent.setup();
            const inputCallback = jest.fn();
            const keydownCallback = jest.fn();
            render(
                <Input
                    type="email"
                    id=""
                    name=""
                    onInput={inputCallback}
                    onKeyDown={keydownCallback}
                />
            );
            const field: HTMLInputElement = screen.getByRole('textbox');
    
            // when
            await user.click(field);
            await user.keyboard('a');
    
            // then
            expect(inputCallback).toHaveBeenCalledTimes(1);
            expect(keydownCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('password input field', () => {
        it('should handle user input', async () => {
            // given
            const user = userEvent.setup();
            const inputCallback = jest.fn();
            const keydownCallback = jest.fn();
            render(
                <Input
                    type="password"
                    id=""
                    name=""
                    onInput={inputCallback}
                    onKeyDown={keydownCallback}
                    placeholder="Enter password"
                />
            );
            const field: HTMLInputElement = screen.getByPlaceholderText('Enter password');
    
            // when
            await user.click(field);
            await user.keyboard('a');
    
            // then
            expect(inputCallback).toHaveBeenCalledTimes(1);
            expect(keydownCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('date input field', () => {
        it('should handle user input', async () => {
            // given
            const user = userEvent.setup();
            const inputCallback = jest.fn();
            const keydownCallback = jest.fn();
            render(
                <Input
                    type="date"
                    id=""
                    name=""
                    onInput={inputCallback}
                    onKeyDown={keydownCallback}
                    placeholder="Enter date"
                />
            );
            const field: HTMLInputElement = screen.getByPlaceholderText('Enter date');
    
            // when
            await user.click(field);
            await user.clear(field);
            await user.type(field, '2020-05-12');
    
            // then
            expect(inputCallback).toHaveBeenCalledTimes(1);
            expect(keydownCallback).toHaveBeenCalledTimes(10);
        });

        it('should validate if input is required', async () => {
            // given
            const user = userEvent.setup();
            render(
                <Input
                    type="date"
                    id=""
                    name=""
                    onInput={jest.fn()}
                    required
                    placeholder="Enter date"
                />
            );
            const field: HTMLInputElement = screen.getByPlaceholderText('Enter date');

            // when
            await user.click(field);

            // then
            expect(field).toBeInvalid();

            // when
            await user.type(field, '2020-05-12');

            // then
            expect(field).toBeValid();

            // when
            await user.keyboard('{Backspace}');

            // then
            expect(field).toBeInvalid();
        });
    });

    describe('textarea', () => {
        it('should handle user input', async () => {
            // given
            const user = userEvent.setup();
            const inputCallback = jest.fn();
            const keydownCallback = jest.fn();
            render(
                <Input
                    type="textarea"
                    id=""
                    name=""
                    onInput={inputCallback}
                    onKeyDown={keydownCallback}
                />
            );
            const field: HTMLInputElement = screen.getByRole('textbox');

            // when
            await user.click(field);
            await user.keyboard('a');

            // then
            expect(inputCallback).toHaveBeenCalledTimes(1);
            expect(keydownCallback).toHaveBeenCalledTimes(1);
        });

        it('should validate if input is required', async () => {
            // given
            const user = userEvent.setup();
            render(
                <Input
                    type="textarea"
                    id=""
                    name=""
                    onInput={jest.fn()}
                    required
                />
            );
            const field: HTMLInputElement = screen.getByRole('textbox');

            // when
            await user.click(field);

            // then
            expect(field).toBeInvalid();

            // when
            await user.keyboard('a');

            // then
            expect(field).toBeValid();

            // when
            await user.keyboard('{Backspace}');

            // then
            expect(field).toBeInvalid();
        });
    });

    describe('numeric input field', () => {
        it('should handle user input', async () => {
            // given
            const user = userEvent.setup();
            const inputCallback = jest.fn();
            const keydownCallback = jest.fn();
            render(
                <Input
                    type="number"
                    id=""
                    name=""
                    onInput={inputCallback}
                    onKeyDown={keydownCallback}
                    placeholder="Enter number"
                />
            );
            const field: HTMLInputElement = screen.getByPlaceholderText('Enter number');

            // when
            await user.click(field);
            await user.type(field, '1');

            // then
            expect(inputCallback).toHaveBeenCalledTimes(1);
            expect(keydownCallback).toHaveBeenCalledTimes(1);
        });

        it('should validate if input is required', async () => {
            // given
            const user = userEvent.setup();
            render(
                <Input
                    type="number"
                    id=""
                    name=""
                    onInput={jest.fn()}
                    required
                    placeholder="Enter number"
                />
            );
            const field: HTMLInputElement = screen.getByPlaceholderText('Enter number');

            // when
            await user.click(field);

            // then
            expect(field).toBeInvalid();

            // when
            await user.keyboard('1');

            // then
            expect(field).toBeValid();

            // when
            await user.keyboard('{Backspace}');

            // then
            expect(field).toBeInvalid();
        });

        it('should validate if value is between min and max', async () => {
            // given
            const user = userEvent.setup();
            render(
                <Input
                    type="number"
                    id=""
                    name=""
                    onInput={jest.fn()}
                    min={2}
                    max={3}
                    placeholder="Enter number"
                />
            );
            const field: HTMLInputElement = screen.getByPlaceholderText('Enter number');

            // when
            await user.click(field);
            await user.keyboard('1');

            // then
            expect(field).toBeInvalid();

            // when
            await user.clear(field);
            await user.keyboard('2');

            // then
            expect(field).toBeValid();

            // when
            await user.clear(field);
            await user.keyboard('4');

            // then
            expect(field).toBeInvalid();
        });
    });
});
