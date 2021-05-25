export default {
    router: {
        linkExactActiveClass: 'active',
        extendRoutes(routes, resolve) {
            routes.splice(0)    // 移除 nuxt 自动生成的路由配置
            routes.push(...[    // 添加自定义的路由
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '',
                            name: 'Home',
                            component: resolve(__dirname, 'pages/home/'),
                        },
                        {
                            path: 'login',
                            name: 'Login',
                            component: resolve(__dirname, 'pages/login/'),
                        },
                        {
                            path: 'register',
                            name: 'Register',
                            component: resolve(__dirname, 'pages/login/'),
                        },
                        {
                            path: 'profile/:username',
                            name: 'Profile',
                            component: resolve(__dirname, 'pages/profile/'),
                        },
                        {
                            path: 'settings',
                            name: 'Settings',
                            component: resolve(__dirname, 'pages/settings/'),
                        },
                        {
                            path: 'editor/:slug?',
                            name: 'Editor',
                            component: resolve(__dirname, 'pages/editor/'),
                        },
                        {
                            path: 'article/:slug',
                            name: 'Article',
                            component: resolve(__dirname, 'pages/article/'),
                        }
                    ]
                }
            ])
        }
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ],
    server: {
        host: '0.0.0.0',    // 监听所有的网卡地址
        port: 3000
    }
}