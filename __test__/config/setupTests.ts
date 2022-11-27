import '@testing-library/jest-dom';
import { getDummyServer } from '../../src/utils/test/dummyApi';

const server = getDummyServer();

beforeAll(() => server.listen({
    onUnhandledRequest: 'warn',
}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
