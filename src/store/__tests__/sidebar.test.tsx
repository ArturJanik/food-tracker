import { h, FunctionalComponent } from 'preact';
import { cleanStores, keepMount } from 'nanostores'
import { sidebar, runSidebar, resetSidebar } from '../sidebar';

describe('sidebar store', () => {
    afterEach(() => {
        cleanStores(sidebar);
    });
    
    it('should return sidebar as inactive by default', () => {
        // given
        keepMount(sidebar);

        // then
        expect(sidebar.get()).toEqual({ type: 'INACTIVE' });
    });
    
    it('should handle opening and closing sidebar', () => {
        // given
        keepMount(sidebar);
        const DummyComponent: FunctionalComponent = () => <div>abc</div>;
        const content = <DummyComponent />;

        // when
        runSidebar(content);

        // then
        expect(sidebar.get()).toEqual({ type: 'ACTIVE', content });

        // when
        resetSidebar();

        // then
        expect(sidebar.get()).toEqual({ type: 'INACTIVE' });
    });
});
