const cookieparser = process.server ? require('cookieparser') : undefined

// 为了防止数据冲突，state 需要定义成一个函数，返回数据对象
export const state = () => {
    return {
        user: null
    }
}
export const mutations = {
    setUser(state, user) {
        state.user = user
    }
}
export const actions = {
    // 此方法只会在服务端渲染期间运行
    // 初始化容器数据，传递数据给客户端使用
    nuxtServerInit({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setUser', user)
    }
}