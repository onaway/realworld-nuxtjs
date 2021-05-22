<template>
    <div>
        <!-- 导航 -->
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="index.html">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" exact to='/'>Home</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to='editor'>
                            <i class="ion-compose"></i>&nbsp;New Post
                        </nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to='/settings'>
                            <i class="ion-gear-a"></i>&nbsp;Settings
                        </nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to='login'>Sign in</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to='register'>Sign up</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/@onaway">
                            <img class="user-pic" src="http://hotupdate.enjoymi.com/videos/kof2/202105/577d0e5f37274b7c192ce0ffdc1beed0.jpg">
                            onaway
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- 子路由 -->
        <nuxt-child />

        <!-- 底部 -->
        <footer>
            <div class="container">
                <a href="/" class="logo-font">conduit</a>
                <span class="attribution">
                    An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
                    licensed under MIT.
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Layout',
    data() {
        return {

        };
    },
    methods: {

    }
}
</script>

<style lang='less' scoped>
</style>