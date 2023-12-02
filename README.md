# 📌 Notion 클로닝 프로젝트 v1

- 프로젝트 기한: 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  <br>
  해당 프로젝트의 커밋 메세지는 <a href="https://gitmoji.dev/">깃모지</a>를 사용하고 있습니다.
  <small>(자세한 커밋 이모지의 의미는 링크를 참고해주세요.)</small>

## 프로젝트 실행 필요 파일

<strong>config.js를 ./src/utils 폴더에 추가해야 프로젝트 파일을 로컬에서 실행시킬 수 있습니다. </strong>

```
// config.js

export const RESPONSE_HEADER = {
  API_END_POINT: "https://kdt-frontend.programmers.co.kr",
  X_USERNAME: "고유한 유저 이름",
};

```

## 프로젝트 미리보기

![노션 클로닝 v1 미리보기](https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/114740795/aff3b551-7b55-4edf-b758-bdb39dd5923d)

### 기본 요구사항

- [x] 바닐라 JS만을 이용해 노션을 클로닝합니다.
- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
  - [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

### 보너스 요구사항

- [x] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.

### 기타 챌린지

- [x] 노션과 유사한 스타일/UI 형태를 구현합니다.
  - [x] document 페이지의 header를 추가합니다.
    - [x] document header에 delete button이 추가됩니다.
  - [x] 사이드바에 토글 버튼을 추가합니다.
    - [x] 토글 버튼을 누르면 하위 documents가 펼쳐집니다. 다시 누르면 닫힙니다.
    - [x] document 리스트는 새로고침을 해도 펼쳐진 상태가 유지되어있습니다. 창을 닫으면 다시 초기화됩니다.
- [x] 삭제 이후 편집기 선택 안 된 상태로 돌아갑니다.
- [x] 존재하지 않는 문서이면 편집기가 선택 안 된 상태로 돌아갑니다.
- [x] 제목을 변경하면 실시간으로 list-item의 제목과 document-header의 제목이 변경되도록 합니다.

## v2 업데이트 예정

- [ ] 노션의 명령어 기능을 구현합니다.
  - [ ] '/페이지링크'를 입력하면 해당 페이지 링크로 이동합니다.
- [ ] 노션 사이드바의 사이즈를 늘리거나 줄일 수 있게 됩니다.
- [ ] 노션 document header가 breadcrumb 형식으로 변경됩니다.
