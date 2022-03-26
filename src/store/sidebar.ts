import { atom } from 'nanostores';

type SidebarState = 
    | {
        type: 'INACTIVE';
    }
    | {
        type: 'ACTIVE';
        content: preact.JSX.Element;
    };

const initialState: SidebarState = {
    type: 'INACTIVE',
};

export const sidebar = atom<SidebarState>(initialState);

export function runSidebar(content: preact.JSX.Element): void {
    if (sidebar.get().type === 'INACTIVE') {
        sidebar.set({ type: 'ACTIVE', content });
    }
}

export function resetSidebar(): void {
    if (sidebar.get().type === 'ACTIVE') {
        sidebar.set(initialState);
    }
}
