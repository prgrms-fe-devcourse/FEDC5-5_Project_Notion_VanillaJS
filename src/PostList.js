export default function PostList({ $target, initialState, onPostClick }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `<ul>${this.state
      .map((post) => `<li data-id="${post.id}">${post.title}</li>`)
      .join("")}</ul>`;
  };

  //   this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li"); // postList내 클릭한 li 가져오기
    console.log($li.dataset.id);
    if ($li) {
      const { id } = $li.dataset;

      onPostClick(id);
    }
  });
}
