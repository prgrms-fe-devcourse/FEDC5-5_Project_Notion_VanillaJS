import styles from "./userGuide.module.scss";

const { s_guideSection, s_guideArticle, s_guideSummary } = styles;

function UserGuide() {
  return {
    element: `
      <section class="${s_guideSection}">
        <h1 class="guide-header">안녕하세요! 노션에 오신 것을 환영합니다.</h1>
        
        <article class="${s_guideArticle}">
          <h2 class="guide-subheader">자동 저장 기능</h2>
          <p class="guide-content">
            사용자가 문서를 작성하거나 수정할 때마다 별도의 저장 버튼을 누를 필요 없이 자동으로 저장됩니다. 
            이로 인해 실수로 데이터를 잃어버리는 위험이 없습니다.
          </p>
        </article>

        <article class="${s_guideArticle}">
          <h2 class="guide-subheader">사이드바 문서 뷰</h2>
          <p class="guide-content">
            작성된 모든 문서는 사이드바에서 간편하게 확인할 수 있습니다. 
            사용자는 사이드바에서 원하는 문서를 쉽게 찾을 수 있습니다.
          </p>
        </article>

        <article class="${s_guideArticle}">
          <h2 class="guide-subheader">유연한 문서 관리</h2>
          <p class="guide-content">
            사용자는 문서를 자유롭게 추가하거나 삭제할 수 있습니다. 
            이를 통해 개인 또는 팀의 작업 흐름에 맞게 문서를 구성할 수 있습니다.
          </p>
        </article>

        <p class="${s_guideSummary}">
          노션의 이와 같은 특징은 사용자에게 효과적이고 효율적인 문서 관리 경험을 제공합니다.
          <p>지금부터 경험해보세요!</p>
        </p>
        
        
      </section>
    `,
  };
}

export default UserGuide;
