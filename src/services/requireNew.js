function requireNew(target) {
    if(target == null) {
        throw new Error("new 키워드로 호출하세요!");
    }
}

export default requireNew;