# 📌 5주차 프로젝트[Project1]

## 📌 과제 설명 <!-- 어떤 걸 만들었는지 대략적으로 설명해주세요 -->

## 요구 사항과 구현내용

[스크린캐스트 2023년 10월 25일 21시 28분 41초.webm](https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/87127340/54d0e84e-a852-4695-980d-980442dcf48b)

- [x] 바닐라 JS만을 이용해 노션을 클로닝합니다.
- [x] 기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
- [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
- [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 추가 요구사항

- [x] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
- [ ] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.
- [ ] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.
- [x] 그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!(버튼 애니메이션, 새로고침시 저장..)

## ✅ 피드백 반영사항 지난 코드리뷰에서 고친 사항을 적어주세요.

- [x] 사용하지 않는 코드 및 주석 지우기
- [x] 매직넘버를 최대한 지양하고 상수화 시켜 파일 분리
- [x] 이름이 긴 함수 최대한 작명 잘하기
- [x] 옵저버패턴의 구독에 같은콜백 계속 등록되는 것 방지(set)
- [x] 함수 if문대신 옵셔널 체이닝
- [x] NavPage이름 Nav로 변경
- [x] routes 데이터 구조 배열에서 Map으로 변경
- [x] App.js에서 render함수 호출되는 방식 변경
- [?] Button컴포넌트의 attributes 명시적으로 알 수 있게 변경
- [x] DocumentItem컴포넌트에서 쿼리셀렉터 예외처리로 `undefined`리턴하는 부분 삭제
- [x] Editor컴포넌트 상단에 state 모아두기
- [ ] Editor컴포넌트의 `keyDownHandler, onInputHanlder` 내부 함수 분리하기
- [x] `Observer`가져올때 굳이 다시 참조하지 않기(이미 인스턴스를 생성하여 export중이다)

## ✅ PR 포인트 & 궁금한 점 <!-- 리뷰어 분들이 집중적으로 보셨으면 하는 내용을 적어주세요 -->

- [x] 옵저버 패턴을 사용해보긴했는데, 제대로 사용한 것이 맞나요?
- [x] contenteditable 에디터 마크다운 처리방법이 궁금합니다(커서위치, 자음모음 분리관련)
- [x] `POST, PUT`등으로 서버의 데이터를 업데이트하면, 전역스토어가 이를 감지하고 데이터를 다시 fetching하여 사용하면 각 컴포넌트마다 props drilling과 상태관리가 편해질 것 같은데, 맞는 방법일까요?
- [x] `DocumentList`와 `DocumentItem`을 이용하여 재귀적 렌더링을 하였는데, 다른사람이 보았을때 단박에 이해하기 어려운 구조인 것 같습니다. 어떤 구조가 더 적절할까요?
- [x] 문서를 클릭하면, 문서 메뉴가 하이라이트 되게 만들었습니다. `documentlist`에서 렌더가 완료되었을때 호출하고(초기렌더링, 새로고침시), `window`에 이벤트리스너`popstate, route-change(커스텀이벤트)`를 등록하여 뒤로가기,앞으로가기,주소입력 을 처리하였습니다
      괜찮은 방법인지 궁금합니다
- [x] 변수와 함수명이 제일 어렵습니다...ㅠㅠ`changeBackgroundSelectedDocument`처럼 함수명이 길어지면 어떻게 처리하시나요?
- [x] **svg**파일 처리가 궁금합니다. `export, import`를 처리하기위하여 각 js파일을 만들어 변수에 할당하였는데, **icon.svg**이런식으로 그냥 관리하는게 좋을까요?
- [x] 버튼상태를 로컬스토리지에 저장하는데, `{ key: dataset.id, value:  { isFoleded : boolean }}` vs `{ key: isFolded, value:{ 1:false,2:false, 3:true} }` 이런식으로 밸류에 datasetid : boolean 형식으로 저장하는게 좋을까요? 어떤방법이 좋은지 궁금합니다!
- [x] 재사용 가능한 컴포넌트는 최대한 의존성을 없애고 쪼개고, 조금 달라지는 컴포넌트면 상속해서 새로 제작하는게 좋을까요?
- [x] 항상 코드리뷰를 꼼꼼히 해주셔서 감사합니다

<!-- ## 남은 처리사항

- [x] documentItem에 부여된id를 key로 display-none 값을 localStorage에 저장 후 다시 렌더링되도 펼쳐져 보이게...
- [?] 전역store생성 및 구독 시스템 => 옵저버구독시스템은 확인. 전역스토어는 내일 다시한번....
- [x] 에디터 부분 css처리
- [x] 하위문서 갯수가 넘칠때 예외처리(css포함)
- [x] 재사용 가능한 Title 컴포넌트 제작(documentListTitle, documentTitle 분리)
- [x] 버튼들 모두 재사용 가능한 Button 컴포넌트로 교체
- [x] 하위문서가 존재하지 않을때 '하위문서 없음' 렌더링. => 일단 처리했는데 좀더...재사용 가능하게 documentItem을 짜면 용이할것 같다...
- [x] 시간 남으면 구독 시스템을 flux패턴으로 제작. 안되면 구독자 전체에게 알림 => 구독자 전체에게 일단 알린다
- [x] 에디터 contentEditable로 전환(추가 요구사항)
-->
