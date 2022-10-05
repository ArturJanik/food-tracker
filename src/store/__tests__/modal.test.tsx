import { cleanStores, keepMount } from 'nanostores'
import { modal, runModal, resetModal } from '../modal';

describe('modal store', () => {
    afterEach(() => {
        cleanStores(modal);
    });
    
    it('should return modal as inactive by default', () => {
        // given
        keepMount(modal);

        // then
        expect(modal.get()).toEqual({ type: 'INACTIVE' });
    });
    
    it('should handle opening and closing modal', () => {
        // given
        keepMount(modal);
        const onConfirmStub = jest.fn();
        const onCancelStub = jest.fn();

        // when
        runModal('Some text', onConfirmStub, onCancelStub);

        // then
        expect(modal.get()).toEqual({
            type: 'ACTIVE',
            text: 'Some text',
            onConfirm: onConfirmStub,
            onCancel: onCancelStub,
        });

        // when
        resetModal();

        // then
        expect(modal.get()).toEqual({ type: 'INACTIVE' });
    });
});
