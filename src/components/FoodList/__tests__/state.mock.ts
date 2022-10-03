export const mockFoodnotesStore = () => {
    const originalModule = jest.requireActual('../../../store/foodnotes');

    return {
        __esModule: true,
        ...originalModule,
        addNote: jest.fn(),
    };
};

interface MockSettingsStoreOptions {
    dateString?: string;
}

export const mockSettingsStore = (options: MockSettingsStoreOptions) => {
    const originalModule = jest.requireActual('../../../store/settings');

    const defaultOptions = {
        dateString: '2.04.2022',
    };

    const { dateString } = { ...defaultOptions, ...options };

    return {
        __esModule: true,
        ...originalModule,
        selectedDate: {
            ...originalModule.selectedDate,
            get: () => new Date(dateString),
        },
    };
};
