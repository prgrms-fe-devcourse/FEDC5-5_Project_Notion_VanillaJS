# 

## 📌 과제 설명 <!-- 어떤 걸 만들었는지 대략적으로 설명해주세요 -->

VanillaJS로 노션을 클로닝하는 프로젝트입니다.
![image](https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/91151775/d35845f9-784d-45a2-a8dd-98e1419aabba)



## 👩‍💻 요구 사항과 구현 내용 <!-- 기능을 Commit 별로 잘개 쪼개고, Commit 별로 설명해주세요 -->

### 기본 요구사항 ⛏

바닐라 JS만을 이용해 노션을 클로닝합니다.

기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.

- [x]  글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x]  화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [x]  Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [x]  해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [x]  Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x]  편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x]  History API를 이용해 SPA 형태로 만듭니다.
- [x]  루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
- [x]  /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

### 보너스 요구사항⛏

- [x]  기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
- [ ]  편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.
- [ ]  편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.

그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!

### 파일 디렉토리 구조 ⚙

css와 img폴더는 스타일링을 위한 폴더입니다.
**library**에는

1. api통신을 위한 **api.js**
2. 라우팅을 위한 **router.js**
3. 편집기에서 제목 변환시 루트에도 변화를 주기 위한 **titleChanger.js**
4. 편집기 내에서 markdown과 html을 변환해주는 **convert.js**
가 존재합니다.

src 폴더 내부에는 화면 구성을 위한 **main.js**와 **App.js**, 하위로 **Document폴더**와 **Root폴더**를 가지고 있습니다.

### 화면 구성 (src 폴더 내부)

![image](https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/91151775/b331f344-55a8-4973-a010-63bf9901786d)


### 구현 내용 🛠

### App.js 📝

1. RootContainer과 documentContainer를 관리합니다.
2. this.render 함수를 통해 url을 파싱하여 홈 화면 또는 document편집기로 화면을 렌더링합니다.

### RootContainer 📝

1. 상단에 title, 하단에 rootList를 출력합니다.
2. title의 경우 노션로고와 '이재준의 Notion' 이라는 텍스트를 출력하며 클릭 시 **router.js에서 커스텀 이벤트를 통해 App.js의 this.render를 호출**하는 로직을 통해 홈 화면으로 이동합니다.
3. RootList에서 각 기능에 맞는 콜백을 전달받아 request요청을 통해 **document 조회, 새 document 생성, 하위 document 생성, document 삭제** 역할을 수행합니다.

### RootList 📝

1. **DocumentTree**를 **렌더링** 합니다.
2. **this.render** 내부에서 **documentTree**를 렌더링 하기 위해 **renderDocument**함수를 실행합니다.
3. **renderDocument**는 재귀적으로 호출되면서 **하위 document유무에 따른 클래스 추가 및 화살표 표시 및 재귀호출** 을 수행하며, 제목이 길면 잘라서 표현하는 역할도 수행합니다.
4. addEventListener를 통해 RootList 내부의 요소들을 클릭 시 각 요소 별로 액션을 수행합니다. 자세한 내용은 주석으로 처리되어있습니다.

### DocumentContainer 📝

1. **this.init** 함수를 통해 Document가 선택되지 않은 경우 빈 화면을 출력합니다.
2. setState를 통해 editor의 setState호출 및 **editor를 렌더링**합니다.

### Editor.js 📝

1. 기존 Editor는 textarea로 구현하였습니다.
2. 추후에 textarea를 보너스 요구사항에 따라 contenteditable과 div를 조합하다보니 많은 변경사항이 생겨 **textarea를 사용한 편집기는 Editor원본.js에 보관하였습니다.**
3. contenteditable한 Editor.js는 DocumentContainer를 통해 render가 실행됩니다. 제목이 없거나 내용이 없는 경우에 따라 제목을 설정하거나 에디터 테두리를 설정하여 입력할 부분을 표시해줍니다.
4. **this.focus**함수 : 편집기에 focused가 발생할 시 **convert.js**의 변환 함수를 통해 html태그를 markdown으로 변환해 편집이 가능하게 합니다.
5. 편집기에 keyup 이벤트가 발생 시 **handleKeyup** 함수로 액션을 처리해줍니다.
6. **handleKeyup** 함수는 제목이 편집되었다면 **handleTitle**, 내용이 편집되었다면 **handleContent**를 실행합니다.
7. **handleTitle**함수는 제목이 편집 될 경우 **PUT** 메소드를 실행하는 **fetchEditDoc**을 호출하고, **titleChanger.js**에 있는 **changeRootTitle**을 실행하여 **Root에도 제목 변화**가 적용되도록 합니다.
8. **handleContent**함수는 본문 내용을 api통신을 위해 markdown문법을 HTML로 변환해줍니다. 이후 fetchEditDoc을 실행합니다.

### 구현 실패한 내용 😥

- [ ]  편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다. ---->
**FindTitle.js** 에서 구현을 시도해보았지만 실패하여 주석처리 하였습니다.
1. Editor의 본문 내용이 변화해 handleContent가 실행될 때 마다
2. 정규표현식을 사용해 본문내용과 docuemntList에서 제목이 match하는 부분이 있다면
3. 해당 부분에 a태그 및 push를 통한 이동을 하려 하였는데
4. addEventListener로 click 이벤트를 받게 하려고 할 때마다 오류가 발생하였습니다.

### 리팩토링된 내용 -> titleChagner.js 🔧

**편집기**에서 제목이 변경 될 경우 **왼쪽 root**에 표시되는 내용도 실시간으로 **업데이트** 해주기 위하여 기존에 작업했던 방식은 Editor->DocumentContainer->App->RootContainer->Root 로 **하위에서 상위로 콜백**을 통해 전달하고, 다시 상위에서 다른 하위 컴포넌트로 전달되는 방식이었습니다.
titleChanger.js에서는 Editor.js에서 제목이 변경될 경우 **changeRootTitle**을 통해 window에 **커스텀 이벤트를** 발생시켜 App.js에서 **getChagnedTitle**가 실행될 시 다시 **documentsList**를 불러오도록 하였습니다.

## ✅ PR 포인트 & 궁금한 점 <!-- 리뷰어 분들이 집중적으로 보셨으면 하는 내용을 적어주세요 -->

### PR 포인트

초반에 커밋 내역을 신경쓰며 PR 메시지를 작성하려 하였으나, Editor 부분의 큰 변경 ce2c41d2182094f5b4b87de5186a20cf965cabf5 으로 인해 커밋된 기능들의 의미가 좀 퇴색된 것 같습니다ㅠㅠ

해당 커밋에서는 textarea로 되어있던 기존 편집기를 div contenteditable로 바꾸는 과정에서 많은 변화가 생겼습니다. 
그 과정에서 생각보다 많은 시간이 소요되기도 하고, 어려움을 많이 겪으며 동작 면에서 불안정한 요소들도 많이 발생했습니다.

따라서 ce2c41d2182094f5b4b87de5186a20cf965cabf5 시점의 기능에서 버그나 이상한 점이 너무 많이 보여서 불편하시다면 Editor원본.js로 작성되어있던 마지막 커밋인 802e7acd42b78bdedc52f1ec8ab43c712ce2daed 와 비교하여 봐주시는게 좋아보입니다.

802e7acd42b78bdedc52f1ec8ab43c712ce2daed 시점의 커밋은 **기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.** 라는 요구사항이 반영되지는 않았지만 좀 더 깔끔한 로직을 가지고 있던 시점이라고 생각되기 때문입니다.

또... 생각보다 작업 규모가 커지면서 함수나 파일 분리에 대한 길을 잃어버린 것 같아서 이 부분도 체크해주시면 감사하겠습니다.

파일명, 변수명, 함수명에서 컨벤션을 제대로 신경쓰지 않고 작업한 부분이 있습니다. 죄송합니다.😥

### 궁금한 점
제가 실패했다고 표기한 FindTitle.js를 모각코 때라거나... 도와주시면 감사할 것 같습니다..
