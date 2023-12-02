import { currentComponent } from "@/core";
import { deepEqual, isObject } from "@/utils";

type EffectCallback = () => void;
type DependenciesArray = ReadonlyArray<unknown>;

const previousDependenciesMap = new Map<string, DependenciesArray | []>();

const hasDepsChanged = (newDependencies: DependenciesArray, oldDependencies: DependenciesArray): boolean =>
  newDependencies.some((dependency, i) =>
    isObject(dependency) ? !deepEqual(dependency, oldDependencies[i]) : dependency !== oldDependencies[i],
  );

const useEffect = (callback: EffectCallback, dependencies: DependenciesArray) => {
  if (!currentComponent) {
    throw new Error("useEffect는 컴포넌트 안에서만 호출될 수 있습니다..");
  }

  const { id } = currentComponent;

  const previousDependencies = previousDependenciesMap.get(id);

  if (!previousDependencies) {
    callback();
  }

  if (previousDependencies && hasDepsChanged(dependencies, previousDependencies)) {
    callback();
  }

  previousDependenciesMap.set(id, dependencies);
};

export default useEffect;
