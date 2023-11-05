export default function HelpCard({ target }) {
  this.state = false;

  this.setState = () => {
    this.render();
  };

  const cardElement = document.createElement("div");
  cardElement.setAttribute("class", "app_helpCard");
  cardElement.innerHTML = `
    <h1 class="app_helpCard_title">⌨️ 단축키 가이드</h1>
    <h3>✏️ 제목</h3>
    <p>[ 제목 1 ]</p>
    <p class="CardText_Tap"># 다음 Space를 입력하면 제목1을 만듭니다.</p>
    <p>[ 제목 2 ]</p>
    <p class="CardText_Tap">## 다음 Space를 입력하면 제목2을 만듭니다.</p>
    <p>[ 제목 3 ]</p>
    <p class="CardText_Tap">### 다음 Space를 입력하면 제목3을 만듭니다.</p>
    <p class="empty"> </p>
    <p>💡 제목 전환이후 일반으로 돌리고싶다면 back space ! </p>
    <p>💡 제목 전환이후 다른 제목으로 변경을 원한다면 </p>
    <P class="CardText_Tap">맨 앞에 원하는 마크다운 입력</p>
    <div> </div>
    <h3>✏️ 구분선</h3>
    <P>"- - - "를 입력하면 구분선을 만듭니다 </p>
    <p class="empty"> </p>
    <p>지우는 방법</p>
    <P>⒈해당 구분선 우클릭!</>
    <p>⒉구분선 바로 밑 줄에서 back space ! 
    <p class="CardText_Tap">( 해당 줄이 비어있어야합니다) </p>
    <div> </div>
    <h3>✏️ 콜 아웃</h3>
    <p>"/call" 또는 "/Call" 를 작성시 만들어집니다.</p>
    <div> </div>
    <h3>✏️ 체크 박스</h3>
    <p>"[]" 를 작성시 만들어집니다.</p>
    <p class="empty"> </p>
    <p>💡 체크박스에서 엔터 입력시 추가 체크박스 생성 가능! </p>
    <div> </div>
    <h3>✏️ 코드 블록</h3>
    <p>비어있는 줄에서 \`\`\` 입력후 스페이스바 입력시 </p>
    <p>코드블록으로 전환됩니다.</p>
    <p class="empty"> </p>
    <p>💡 제거는 맨앞에서 back space 입력해주세요! </p>
    <div> </div>
    <h3>✏️ 굵은 글씨</h3>
    <p>원하는 텍스트 양옆에 *** 작성후 스페이스바 입력시 만들어집니다.</p>
  `;

  target.appendChild(cardElement);

  this.render = () => {
    cardElement.classList.toggle("cardToggled");
  };
}
