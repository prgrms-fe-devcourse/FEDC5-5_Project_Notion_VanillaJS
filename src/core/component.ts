interface ComponentInstance {
  element: string;
  bindEvents?: () => void;
}

interface CurrentComponent {
  id: string;
  stateIndex: number;
}

export const hasSingleRoot = (componentElements: string) => {
  const $container = document.createElement("div");
  $container.innerHTML = componentElements.trim();

  return $container.childNodes.length === 1;
};

export let currentComponent: CurrentComponent | null = null;

function createComponent<T>(component: (props: T) => ComponentInstance, props: T): ComponentInstance;

function createComponent(component: () => ComponentInstance): ComponentInstance;

function createComponent<T>(component: (props?: T) => ComponentInstance, props?: T) {
  const previousComponent = currentComponent;

  currentComponent = { id: component.name, stateIndex: 0 };

  const componentInstance = component(props);

  if (!hasSingleRoot(componentInstance.element)) {
    throw new Error(`컴포넌트가 하나의 상위 요소로 감싸져 있지 않습니다!`);
  }

  const idAttributeAddedElement = componentInstance.element.replace(/(<\w+)(\s|>)/, `$1 id="${currentComponent.id}"$2`);

  currentComponent = previousComponent;

  return { ...componentInstance, render: idAttributeAddedElement };
}

export { createComponent };
