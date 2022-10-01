import { useStore } from '@nanostores/preact';
import { FunctionalComponent, h, Fragment } from 'preact';
import { sidebar, resetSidebar } from '../../../store/sidebar';
import Card from '../Card';
import style from './style.css';

const Sidebar: FunctionalComponent = () => {
    const sidebarState = useStore(sidebar);

    if (sidebarState.type === 'INACTIVE') {
        return null;
    }

    const onCancel = () => {
        resetSidebar();
    };

    return (
        <>
            <div class={style.overlay} role="dialog" onClick={onCancel} />
            <div class={style.sidebarWrapper} role="dialog">
                <Card classes={style.sidebar}>
                    {sidebarState.content}
                </Card>
            </div>
        </>
    );
};

export default Sidebar;
