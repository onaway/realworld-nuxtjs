import { request } from '@/plugins/request';

// 标签列表
export const getProfile = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}

// 关注
export const followUser = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    })
}

// 关注
export const unfollowUser = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}