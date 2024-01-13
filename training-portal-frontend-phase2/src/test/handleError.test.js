import { handleError } from '../utils/handleError';

describe('handleError', () => {
  let mockLocalStorageClear;
  let mockNavigate;

  beforeEach(() => {
    mockLocalStorageClear = jest.spyOn(localStorage, 'clear');
    mockNavigate = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('clears localStorage and navigates to "/401" when error message is "Unauthorized"', () => {
    const error = { message: 'Unauthorized' };
    handleError(error, mockNavigate);
    expect(mockNavigate).toHaveBeenCalledWith('/401');
  });

  it('navigates to "/404" when error message is "Not Found"', () => {
    const error = { message: 'Not Found' };
    handleError(error, mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });

  it('navigates to "/500" when error message is "Internal Server Error"', () => {
    const error = { message: 'Internal Server Error' };
    handleError(error, mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith('/500');
  });

  it('navigates to "/500" for any other error messages', () => {
    const error = { message: 'Some Error' };
    handleError(error, mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith('/500');
  });
})