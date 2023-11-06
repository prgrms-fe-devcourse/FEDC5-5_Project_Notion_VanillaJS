# 📌 5주차 프로젝트[Project1]

## 폴더 구조

```
root
├─ README.md
├─ index.html
├─ src
│  ├─ App.js
│  ├─ api
│  │  ├─ api.js
│  │  └─ url.js
│  ├─ components
│  │  ├─ DocumentTree.js    -> 좌측 사이드바
│  │  ├─ Editor.js          -> 편집기
│  │  ├─ Loading.js         -> 로딩 컴포넌트
│  │  ├─ Modal.js           -> 모달 컴포넌트
│  │  └─ TreeList.js        -> 좌측 사이드바의 리스트 컴포넌트
│  ├─ main.js
│  └─ utils
│     ├─ recursion.js
│     └─ storage.js
└─ style.css
```

## Commit Convention
    
| Tag Name | Description |
|:---------|:------------|
feat |	새로운 기능 추가
design |	CSS 등 사용자 UI 디자인 변경
style |	코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
comment |	필요한 주석 추가, 변경 및 삭제
fix |	버그 수정
refactor |	코드 리팩토링, 새로운 기능이나 버그 수정없이 현재 구현을 개선한 경우
docs |	README.md 수정
rename |	파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
remove |	파일을 삭제하는 작업만 수행한 경우