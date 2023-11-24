// TODO: 다른 방식으로 추상화하는 좋은 방법 = ?
export const goToDocument = (id) => {
    // /로 시작해서 그런지, /부터 suburl이 되는 듯. 편해서 좋음.
    history.pushState(null, "", `/documents/${id}`);
    // 이걸 해줘야 push 시에도 popState 호출이 됨... 뭐야
    window.dispatchEvent(new Event("popstate"));
};
