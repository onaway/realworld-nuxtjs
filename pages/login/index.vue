<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                    <p class="text-xs-center">
                        <nuxt-link to='/register' v-if="isLogin">Need an account?</nuxt-link>
                        <nuxt-link to='/login' v-else>Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(messages, field) in errors">
                            <li v-for="message in messages">{{ field }} {{ message }}</li>
                        </template>
                    </ul>

                    <form @submit.prevent="submit">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required>
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? 'Sign in' : 'Sign up' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login, register } from '@/api/user';
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    middleware: 'notAuthenticated',
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            errors: ''  // 错误信息
        };
    },
    computed: {
        isLogin() {
            return this.$route.name === 'Login'
        }
    },
    methods: {
        async submit() {
            try {
                const { data } = this.isLogin ? await login({ user: this.user }) : await register({ user: this.user })
                const { user } = data

                // 保存用户的登录状态
                this.$store.commit('setUser', user)

                // 数据存缓存，使数据持久化，防止页面数据丢失
                Cookie.set('user', user)

                this.$router.push('/')
            } catch (err) {
                this.errors = err.response.data.errors
            }
            
        }
    }
}
</script>

<style lang='less' scoped>
</style>