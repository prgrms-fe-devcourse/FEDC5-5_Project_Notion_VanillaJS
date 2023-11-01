# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)
- 내용
  - [Day 21] 노션 클로닝 요구사항을 확인해 주세요.

---

## 기본 요구사항

바닐라 JS만을 이용해 노션을 클로닝합니다.

기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.

- 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.

- 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.

  - Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.

  - 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.

  - Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.

- 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.

- History API를 이용해 SPA 형태로 만듭니다.

  - 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.

  - /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 보너스 요구사항

- 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.

- 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.

- 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.

그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!

## API

### API 사용법

- 기본적으로 모든 API에 headers에 값 추가

  ```
  'x-username': '다른 사람과 겹치지 않는 고유한 이름'
  ```

### Root Documents 가져오기

- 전체 Document의 구조를 트리 형태로 가져옵니다.
- https://kdt-frontend.programmers.co.kr/documents - GET
- Response

  ```
  [
    {
      "id": 1, // Document id
      "title": "노션을 만들자", // Document title
      "documents": [
        {
          "id": 2,
          "title": "블라블라",
          "documents": [
            {
              "id": 3,
              "title": "함냐함냐",
              "documents": []
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "hello!",
      "documents": []
    }
  ]
  ```

### 특정 Document의 content 조회하기

- https://kdt-frontend.programmers.co.kr/documents/{documentId} - GET
- Response
  ```
  {
  "id": 1,
  "title": "노션을 만들자",
  "content": "즐거운 자바스크립트의 세계!",
  "documents": [
    {
      "id": 2,
      "title": "",
      "createdAt": "",
      "updatedAt": ""
    }
  ],
  "createdAt": "",
  "updatedAt": ""
  }
  ```

### Document 생성하기

- https://kdt-frontend.programmers.co.kr/documents - POST

- Request Body

  ```
  {
  "title": "문서 제목",
  // parent가 null이면 루트 Document가 됩니다.
  // 특정 Document에 속하게 하려면 parent에
  // 해당 Document id를 넣으세요.
  "parent": null
  }
  ```

- Response

  ```
  {
  "id": 6,
  "title": "문서 제목",
  "createdAt": "생성된 날짜",
  "updatedAt": "수정된 날짜"
  }
  ```

### 특정 Document 수정하기

- https://kdt-frontend.programmers.co.kr/documents/{documentId} - PUT
- Request Body

  ```
  {
    "title": "제목 수정",
    "content": "내용 수정"
  }
  ```

### 특정 Document 삭제하기

- https://kdt-frontend.programmers.co.kr/documents/{documentId} - DELETE
- documentId에 해당하는 Document를 삭제합니다.
- 만약 하위 documents가 있는 document를 삭제한 경우, 하위 documents 등은 상위 document가 없어지므로 root document로 인식됩니다.
