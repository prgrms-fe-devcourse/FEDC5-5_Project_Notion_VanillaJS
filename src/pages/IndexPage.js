export default function IndexPage({ $target }) {
  const $indexPage = document.createElement('div');
  $indexPage.className = 'index-page';

  $indexPage.innerHTML = `
    <h1><b>안녕하세요! 🙇🏻‍♂️</b></h1>
    <p style="font-size:20px">본 프로젝트는 프로그래머스 데브코스 프론트엔드 과정 <b>바닐라 자바스크립트 Notion 클로닝 프로젝트</b>입니다. <br/>아래 링크를 통하여 프로젝트의 코드와 상세한 회고를 확인하실 수 있습니다.</p>
    
    <div class="index-button-container">
      <a class="index-link-button" href="https://github.com/w00ngja/FEDC5-5_Project_Notion_VanillaJS/tree/5/%235_%ED%99%A9%EC%9E%AC%EC%9B%85_working"><i class="fa fa-github"></i>깃허브 바로가기</a>
    
      <a class="index-link-button" href="https://w00ngja.tistory.com/"><i class="fa fa-pencil"></i>블로그 바로가기</a>
  </div>
  
  <p>좌측의 <button class="index-add-button">새 문서 작성하기</button> 혹은 <b>문서 리스트를 클릭</b>해 편집을 시작해보세요!</p>
  `;

  this.render = () => {
    $target.appendChild($indexPage);
  };
}
