const storage =  window.localStorage

export const getItem = (key,defaultValue) => {
    try {
        const storageValue = storage.getItem(key)
        return storageValue ? JSON.parse(storageValue) : defaultValue
    } catch(e) {
        return defaultValue
    }
}

export const setItem = (key,value) => {
    storage.setItem(key, JSON.stringify(value))    
}

export const removeItem = (key) => {
    storage.removeItem(key)
}
