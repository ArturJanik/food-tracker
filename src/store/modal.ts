import { atom } from 'nanostores';

type ModalState = 
    | {
        type: 'INACTIVE';
    }
    | {
        type: 'ACTIVE';
        text: string;
        onConfirm: () => void;
        onCancel?: () => void;
    };

const initialState: ModalState = {
    type: 'INACTIVE',
};

export const modal = atom<ModalState>(initialState);

export function runModal(text: string, onConfirm: () => void, onCancel?: () => void): void {
    if (modal.get().type === 'INACTIVE') {
        modal.set({ type: 'ACTIVE', text, onConfirm, onCancel });
    }
}

export function resetModal(): void {
    if (modal.get().type === 'ACTIVE') {
        modal.set(initialState);
    }
}
