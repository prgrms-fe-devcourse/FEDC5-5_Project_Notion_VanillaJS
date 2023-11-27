const ROUTE_CHANGE_EVENT_NAME = `route-change`

export const initRouter = (onRoute) => {
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
        const {
            nextUrl
        } = e.detail
        if (nextUrl) {
            history.pushState(null, null, nextUrl)
            onRoute() //?
        }
    }) //onPostClick을 만들 필요가 없어진다. 
}

export const push = (nextUrl) => {
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
        detail: {
             nextUrl
        }
    }))
}
