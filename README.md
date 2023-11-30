# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)
- 내용
  - [Day 21] 노션 클로닝 요구사항을 확인해 주세요.

## 코드 리뷰 반영 + 추가 구현

- App.js
  [o] route 네이밍 변경
  [o] init으로 초기값 관리

- NotionSideBar.js
  [o] 이벤트 델리게이션 -> 다른 DOM에 있는것 적절치 않음
  [o] 헤더부분, list부분 분리해서 등록

- DeleteDocumentButton.js, DocumentLinkButton.js, NewDocumentButton.js
  [o] 컨텍스트가 담겨있는 버튼들 => molecule보다는 organism에 가까움
  [o] molecule은 SRP을 지키고 컨텍스트를 배제해야 재사용성이 높아지므로 로직을 외부 파라미터로 받아와야함

- /services/api.js
  [o]파라미터 네이밍 변경

- /utils/saveDocumentTitle.js
  [o] 함수명 직관적으로 변경

- Edit 수정
  [ ] 제목에 한글 입력 error
  [ ] 본문에 자소분리 error

- DocumentContent.js
  [ ] richContent 테스트 작성
  [ ] 함수화 하기

[0] DOM 생성 함수화
[ ] 리렌더링 줄이기(DocumentFragment, insertBefore)



