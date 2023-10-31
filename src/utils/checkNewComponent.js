export default function checkNewComponent(target, self) {
    if (self instanceof target === false) {
        throw new Error("컴포넌트 앞에 new를 붙여서 생성하세요.");
    }
}
