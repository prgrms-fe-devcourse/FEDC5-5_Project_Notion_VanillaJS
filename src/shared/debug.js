// 브라우저에서만 없음
if (window) {
    window.process = {};
    window.process.env = {};
    window.process.env.DEBUG = true;
    window.process.env.DEBUG_ENABLED = {};
}

export const enableDebugModule = (moduleName) => {
    window.process.env.DEBUG_ENABLED[moduleName] = true;
};

/**
 * 주의 사항: debug();로 출력하는 경우, debug보다 먼저 초기화되는 코드는
 * 활성화하기 전에 debug를 호출하며 이는 출력되지 못하는 결과를 낳음.
 *
 * 따라서 모듈 수준에서 코드를 초기화하는 게 아닌 생성자 혹은 함수 내에서
 * 호출 후 초기화하도록 해야 함.
 */
export const createDebug =
    (moduleName) =>
    (...args) => {
        if (!window.process.env.DEBUG) {
            return;
        }
        if (!window.process.env.DEBUG_ENABLED[moduleName]) {
            return;
        }
        console.log(`[${moduleName}]`, ...args);
    };
