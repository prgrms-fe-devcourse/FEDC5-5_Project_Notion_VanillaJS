import { debounce } from './debounce';

describe('[ debounce ]', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should execute the callback after the specified delay', () => {
    const callback = jest.fn();
    const delay = 1000;

    const debouncedFunction = debounce(callback, delay);
    debouncedFunction();

    // 타이머가 설정된 시간 이전에는 콜백이 호출되지 않아야 합니다.
    expect(callback).not.toBeCalled();

    // 지정된 지연 시간 이후에는 콜백이 호출되어야 합니다.
    jest.advanceTimersByTime(delay);
    expect(callback).toBeCalled();
  });

  it('should debounce multiple calls', () => {
    const callback = jest.fn();
    const delay = 1000;

    const debouncedFunction = debounce(callback, delay);
    debouncedFunction();
    debounce(callback, delay);

    // 두 번 호출되어도 콜백은 한 번만 호출되어야 합니다.
    jest.advanceTimersByTime(delay / 2);
    debounce(callback, delay);
    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should execute the last call', () => {
    const callback = jest.fn();
    const delay = 1000;

    const debouncedFunction = debounce(callback, delay);

    // 여러 번 호출될 때 가장 마지막 호출만 실행되어야 합니다.
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    jest.advanceTimersByTime(delay * 3);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should execute the callback with real timer', () => {
    const callback = jest.fn();
    const delay = 1000;

    // 여러 번 호출될 때 가장 마지막 호출만 실행되어야 합니다.
    const debouncedFunction = debounce(callback, delay);
    debouncedFunction();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should execute the last callback with real timer', () => {
    const callback = jest.fn();
    const delay = 1000;

    // 여러 번 호출될 때 가장 마지막 호출만 실행되어야 합니다.
    const debouncedFunction = debounce(callback, delay);
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should execute the callback after the specified delay', () => {
    const callback = jest.fn();
    const delay = 1000;

    const debouncedFunction = debounce(callback, delay);
    debouncedFunction();

    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });

  it('should execute the callback with "hi" after the specified delay', () => {
    const callback = jest.fn();
    const delay = 1000;

    const debouncedFunction = debounce(() => callback('hi'), delay);
    debouncedFunction();

    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith('hi');
  });
});
