import { request } from '@/plugins/request';

// 所有文章列表
export const getAllArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

// 关注文章列表
export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}

// 点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消赞
export const delFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 文章详情
export const getArticleDetail = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 评论列表
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 发表评论
export const addComments = (data, slug) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

// 获取文章
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 发表文章
export const createArticle = data => {
    return request({
        method: 'POST',
        url: '/api/articles',
        data
    })
}

// 更新文章
export const updateArticle = (data, slug) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data
    })
}

// 删除文章
export const delArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}