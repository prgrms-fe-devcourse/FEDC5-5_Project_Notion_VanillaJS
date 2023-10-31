const ROUTING_KEY = 'ROUTING_KEY'

export function initRouter(onRoute) {
    window.addEventListener(ROUTING_KEY, (e) => {
        const { nextUrl } = e.detail

        if (nextUrl) {
            history.pushState(null,null, nextUrl)
        
            onRoute()
        }
    })
    window.addEventListener('popstate', onRoute)
}

export function routeTrigger(nextUrl) {
    window.dispatchEvent(new CustomEvent(ROUTING_KEY, {
        detail: {
            nextUrl,
        }
    }))
}