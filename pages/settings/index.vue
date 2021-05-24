<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <form @submit.prevent="updateSettings">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="params.image" class="form-control" type="text" placeholder="URL of profile picture">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="params.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea v-model="params.bio" class="form-control form-control-lg" placeholder="Short bio about you"
                                    rows="8"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="params.email" class="form-control form-control-lg" type="text" placeholder="Email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="password" placeholder="Password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>

                    <hr>

                    <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser, updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    middleware: 'authenticated',
    name: 'Settings',
    data() {
        return {
            params: {
                image: '',
                username: '',
                bio: '',
                email: ''
            }
        };
    },
    computed: {
        ...mapState(['user'])
    },
    mounted() {
        if (!this.user) {
            getUser().then(res => {
                const user = res.data.user
                this.params = Object.assign({}, user)

                // 保存用户的登录状态
                this.$store.commit('setUser', user)

                // 数据存缓存，使数据持久化，防止页面数据丢失
                Cookie.set('user', user)
            })
        } else {
            this.params = Object.assign({}, this.user)
        }
    },
    methods: {
        async updateSettings() {    // 更新用户信息
            const { data } = await updateUser({ user: this.params })
            const { user } = data

            // 更新 user 的值
            this.$store.commit('setUser', user)

            // 更新 Cookie 中 user 的值
            Cookie.set('user', user)
            this.$router.push({ name: 'Profile', params: { username: user.username } })
        },
        logout() {      // 退出登录
            // Cookie 移除 user
            Cookie.remove('user')

            // vuex 中 user 的值置为 null
            this.$store.commit('setUser', null)

            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<style lang='less' scoped>
</style>