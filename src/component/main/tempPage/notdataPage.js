export default function notDatapage() {

    const pageElement = document.createElement('div');

    function init() {
        pageElement.style.display = "none";
        pageElement.innerHTML = `<div class="notfoundpage">
         <div class="notfoundcontent">
            <h1> 404 Not Found. </h1>
            <h3> 해당 페이지가 삭제되었습니다. </h3>
            </div>
        </div>`
    }

    init();

    return pageElement;
}