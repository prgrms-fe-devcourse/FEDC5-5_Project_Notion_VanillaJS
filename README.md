# 📚 바닐라JS 노션 클론 프로젝트
<img width="1624" alt="스크린샷 2023-10-26 오후 9 37 11" src="https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/95916813/a2a938af-8da0-4dda-8491-048f3ec4840a">

### 🔗 https://project-notion-vanillajs-w00ngja.netlify.app/ (배포)



## 프로젝트 정보
- 바닐라 자바스크립트만을 이용해 SPA를 구현한 노션 클로닝 프로젝트
- 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)

<img width="892" alt="스크린샷 2023-10-26 오후 11 18 28" src="https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/95916813/620a7eac-cc4a-4480-a934-f3c5a2d669c8">

![Oct-26-2023 23-30-48](https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/95916813/7045fb8a-656e-47c3-bba0-332a06cbb0e3)
![Oct-26-2023 23-31-47](https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/95916813/d9c0e216-f3c0-4c67-bc2a-ee7effd9b401)



## 프로젝트 요구사항
- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
  - [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

### 추가 구현사항
- [x] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크가 표시됩니다.
- [x] Document 편집 후 자동 저장이 완료되면 우측 하단에 Status 아이콘이 표시됩니다.
- [x] Document 리스트 좌측 화살표 버튼 클릭 시 Document의 펼치기/접기 상태가 토글됩니다.
  - 페이지 최초 렌더링 시 하위 문서를 갖고 있는 Document들은 펼쳐진 채로, 그렇지 않은 Document들은 접힌 채로 출력됩니다.
- [x] Netlify를 이용하여 Continuous Deploy를 구현하였습니다.
- [x] 브라우저 크기에 따른 반응형 페이지를 구성하였습니다.
