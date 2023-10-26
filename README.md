<!--
  템플릿은 아직 PR 작성이 익숙하지 않으신 분들을 위해서 제공하는 가이드입니다!
  리뷰어 또는 이 PR을 보게 될 다른 사람들이 이 PR을 보는데 참고할 수 있는 내용이 있다면 포함해서 작성해주시면 됩니다.
-->

## 📌 과제 설명 <!-- 어떤 걸 만들었는지 대략적으로 설명해주세요 -->

## 👩‍💻 요구 사항과 구현 내용 <!-- 기능을 Commit 별로 잘개 쪼개고, Commit 별로 설명해주세요 -->
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - [x] Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
  - [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.
- [x] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
- [ ] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.
- [ ] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.


<!-- ## ✅ 피드백 반영사항   지난 코드리뷰에서 고친 사항을 적어주세요. 재PR 시에만 사용해 주세요! (재PR 아닌 경우 삭제) -->

## ✅ PR 포인트 & 궁금한 점 <!-- 리뷰어 분들이 집중적으로 보셨으면 하는 내용을 적어주세요 -->
작성중입니다.
