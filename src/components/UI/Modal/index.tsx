import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { modal, resetModal } from '../../../store/modal';
import Button from '../Button';
import Card from '../Card';
import style from './style.css';

const Modal: FunctionalComponent = () => {
    const modalState = useStore(modal);

    if (modalState.type === 'INACTIVE') {
        return null;
    }
    
    const onConfirm = () => {
        modalState.onConfirm();
        resetModal();
    };

    const onCancel = () => {
        if (modalState.onCancel) {
            modalState.onCancel();
        }
        resetModal();
    };

    return (
        <>
            <div class={style.overlay} onClick={onCancel} role="dialog" />
            <div class={style.modalPosition}>
                <Card classes={style.modal}>
                    <div class={style.content}>{modalState.text}</div>
                    <div class={style.buttons}>
                        <Button onClick={onConfirm}>Confirm</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Modal;
