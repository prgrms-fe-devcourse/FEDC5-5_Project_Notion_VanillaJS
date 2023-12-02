import styles from "./nofFound.module.scss";

const { s_notFoundContainer, s_notFoundMessage, s_notFoundDescription } = styles;

function NotFound() {
  return {
    element: `
      <section class="${s_notFoundContainer}">
        <header class="whiteSpace">404</header>
        <p class="${s_notFoundMessage}"> 페이지를 찾을 수 없습니다.</p>
        <p class="${s_notFoundDescription}">올바른 URL을 입력했나요?</p>
      </section>
    `,
  };
}

export default NotFound;
