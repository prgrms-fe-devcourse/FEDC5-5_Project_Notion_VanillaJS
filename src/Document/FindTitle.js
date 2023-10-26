//구현 실패
// import { request } from "../../library/api.js";
// import { push } from "../../library/router.js";

// export default function FindTitle({ $page, initialState }) {
//   console.log("nek");
//   this.state = initialState;

//   this.setState = (nextState) => {
//     this.state = nextState;
//   };

//   const fetchRoot = async () => {
//     const res = await request(`/documents`);
//     //console.log(...res);
//     return res;
//   };

//   fetchRoot();

//   this.findMatchedTitle = async (content) => {
//     console.log("내용", content);

//     // API로부터 받아온 데이터를 가져옴
//     await fetchRoot().then((res) => {
//       res.forEach((item) => {
//         // content에 있는 내용 중 res.title과 겹치는 부분을 찾기
//         const match = content.match(new RegExp(item.title, "i")); // 대/소문자 구분 안 함
//         if (match) {
//           console.log(`일치하는 항목 발견: ${item.title}, ID: ${item.id}`);
//           content = content.replace(
//             match[0],
//             `<span class="clickable">${match[0]}</span>`
//           );
//           console.log("dma", content);
//           // const $span = $page.querySelector(".clickable");
//           // $span.addEventListener("click", (e) => {
//           //   console.log(e.target);
//           // });
//         }
//       });
//     });
//     const clickableElements = document.querySelectorAll(".clickable");
//     clickableElements.forEach((element) => {
//       element.addEventListener("click", () => {
//         console.log("hello");
//         // 원하는 동작을 수행하세요
//       });
//       const container = $page; // 콘텐츠를 표시할 요소의 ID를 설정
//       container.innerHTML = content;
//     });

//     // content를 HTML로 변환
//   };
// }
