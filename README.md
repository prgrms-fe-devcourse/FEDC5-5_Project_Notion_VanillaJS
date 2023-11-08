# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)
- 내용
  - [Day 21] 노션 클로닝 요구사항을 확인해 주세요.

## 요구사항

기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.

- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
- [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
- [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 보너스 요구사항

- [ ] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
- [x] 편집기 최하단에는 현재 편집 중인 Markdown PreviewDocument의 하위 Document 링크를 렌더링하도록 추가합니다.
- [ ] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.
- [ ] 그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!

## 추가적으로 생각나는 것

- [ ] 낙관적 업데이트
- [ ] 노션처럼 드래그앤 드랍으로 끌어서 위치를 조정하는 기능 -> API 미지원
- [ ] 이벤트 쓰로틀링

## 폴더 구조(23.10.25 13:02 UPDATE)

┣ 📂src<br/>
┃ ┣ 📂sidearea<br/>
┃ ┃ ┣ 📜sideAreaFooter.js<br/>
┃ ┃ ┣ 📜sideAreaHeader.js<br/>
┃ ┃ ┣ 📜sideAreaPage.js<br/>
┃ ┃ ┗ 📜sideAreaRender.js<br/>
┃ ┣ 📂textarea<br/>
┃ ┃ ┣ 📜textAreaFooter.js<br/>
┃ ┃ ┣ 📜textAreaPage.js<br/>
┃ ┃ ┗ 📜textAreaRender.js<br/>
┃ ┣ 📂utils<br/>
┃ ┃ ┣ 📜api.js<br/>
┃ ┃ ┗ 📜storage.js<br/>
┃ ┣ 📜app.js<br/>
┃ ┗ 📜main.js<br/>
┣ 📜.gitignore<br/>
┣ 📜README.md<br/>
┣ 🏞️Notion-logo<br/>
┣ 📜index.css<br/>
┗ 📜index.html<br/>

## 현재까지 발견된 이슈사항(크리티컬한 이슈는 볼드체로 표기, 해결시 삭선으로 표기)

- 내부 코드의 반복적인 호출과 렌더링으로 인한 약간의 성능저하 현상 -> 렌더링 코드 구조 개편 필요
- 사이드바의 하위 페이지가 많아지면 계속 나오는 ul, li태그로 인해 해당 내용이 textArea를 침범하는 CSS 이슈
- slow 3G에서는 failed to fetch 오류 및 데이터 누락 현상이 자주 발견
- fast 3G에서도 종종 failed to fetch 오류 및 데이터 누락 현상 발견
- ~~하위 페이지가 없는 페이지에서 제목이 공란일 때 화면에 렌더링 되지 않는 현상 발견~~
  - 제목이 공백이여도 >를 포함하여 렌더링하는 방식으로 해결
- **~~특정한 상황에서 API가 처리되지 않은 채로 title, content 사이를 왔다갔다 하면 focus문제와 API 호출 과정에서 데이터가 누락되는 현상 발견~~**
  - 내부 동작에서 바로 state를 바꿔주어서 문제 해결, 하지만 근본적인 해결책은 아니라고 생각하고 일단 해결 후 이후에 로직 고민
- title, content 사이를 왔다갔다 하면 focus문제 발생함
- ~~최초 화면에서 Title, Content 조작 시 예외처리 안되는 현상 발견~~
  - pageType state를 추가하여 상태를 구분하며 이벤트를 추가하는 방식으로 수정
- ~~Title 조작 시 API 응답이 너무 많이 밀리는 현상 발견~~
  - 이벤트 디바운싱으로 해결
- 사이드바에서 공백의 갯수를 구분하지 못하는 현상 발견 -> 공백 감지를 할 수 있는 방식으로 해결해야함
- ~~새 페이지 생성 시 제대로 편집기 화면이 렌더링 되지 않는 현상 발견~~
  - setState를 또 해주는 문제가 있었고 2번째 setState에서 정상적이지 않은 값을 삽입하여 발생
- 좌우 스크롤 바가 생기는 현상
- ~~다른 화면에서 사이드바 상단 버튼을 눌러 메인페이지로 오면 하단의 자식 페이지가 없어지지 않는 현상~~
  - 해당 부분 innerHTML을 비워주지 않아 발생하는 문제, innerHTML을 비워주어 해결
