# SPA Notion Cloning

SPA인 Notion의 동작을 흉내냈습니다.

복잡한 기능을 구현하는 경험을 하기 위해 코딩 중입니다.

## Custom Renderer

- 직접 Renderer를 만들어 사용했습니다. [GitHub](https://github.com/seongbin9786/my-renderer) [npm](https://www.npmjs.com/package/@seongbin9786/my-renderer)

## Pages

- 총 1페이지
  - 편집 페이지 (Sidebar + Editor)

## Components

- `App` (API 요청)
- `Layout` (기본 페이지 레이아웃)
  - `Header` (페이지 표시)
  - `Sidebar` (페이지 목록 표시)
  - `Editor` (`contenteditable` 기반 편집기)
    - `Dropdown` (`/` 입력 시)
    - `Popup` (드래그 시)

- 현재는 `App`만 상태를 갖는 컴포넌트입니다.
