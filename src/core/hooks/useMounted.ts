import { currentComponent } from "../component";

type CleanupFunction = () => void;
const mountedComponents: Record<string, { isMounted: boolean; cleanup?: CleanupFunction }> = {};

export function useMounted(callback: () => CleanupFunction | undefined) {
  if (!currentComponent) {
    throw new Error("useMounted는 컴포넌트 안에서만 호출될 수 있습니다.");
  }

  const { id } = currentComponent;

  if (!mountedComponents[id]) {
    // 처음 마운트될 때만 callback을 호출
    const cleanup = callback();
    mountedComponents[id] = { isMounted: true, cleanup };
  }

  // 컴포넌트가 언마운트 될 때
  if (!document.getElementById(id)) {
    mountedComponents[id].cleanup?.();
    delete mountedComponents[id]; // 언마운트 된 컴포넌트의 정보를 삭제
  }
}
