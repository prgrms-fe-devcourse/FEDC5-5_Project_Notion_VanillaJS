import request from "./api.js"

export const fetchPost = async (id, options={}) => {
    const defaultPost = {
        title: '',
        content: ''
    }

    return id === 'new' ? defaultPost : await request(`/documents/${id}`,options)
}

export const fetchPostList = async (options={}) => {

    return await request('/documents',options)
}