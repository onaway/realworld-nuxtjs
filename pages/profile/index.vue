<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img" />
                        <h4>{{ profile.username }}</h4>
                        <p>{{ profile.bio }}</p>
                        <nuxt-link v-if="isYourself" to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
                            <i class="ion-gear-a"></i>
                            Edit Profile Settings
                        </nuxt-link>
                        <button v-else :disabled="disabled" class="btn btn-sm action-btn btn-outline-secondary" @click="follow(profile)">
                            <i class="ion-plus-round"></i>
                            {{ profile.following ? `Unfollow ${profile.username}` : `Follow ${profile.username}` }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <a class="nav-link active" href="">My Articles</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="">Favorited Articles</a>
                            </li>
                        </ul>
                    </div>

                    <!-- 文章列表 -->
                    <article-preview :articles="articles"></article-preview>

                    <!-- 分页 -->
                    <nav>
                        <ul class="pagination">
                            <!-- <li class="page-item" :class="{active: item === page}" v-for="item in totalPage">
                                <nuxt-link :to="{ name: 'Home', query: { page: item, tag: $route.query.tag, tab: tab } }" class="page-link">
                                    {{ item }}</nuxt-link>
                            </li> -->
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProfile, followUser, unfollowUser } from '@/api/profile'
import { getAllArticles } from '@/api/article'
import { mapState } from 'vuex'
import ArticlePreview from '@/pages/home/components/article-preview'

export default {
    middleware: 'authenticated',
    name: 'Profile',
    components: {
        ArticlePreview
    },
    data() {
        return {
            profile: {},
            articles: [],
            articlesCount: '',
            limit: 5,
            disabled: false
        };
    },
    computed: {
        ...mapState(['user']),
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit);
        },
        isYourself() {
            if (this.user) return this.profile.username === this.user.username
        }
    },
    mounted() {
        const { username } = this.$route.params

        username && getProfile(username).then(res => {
            this.profile = res.data.profile
        })

        const page = parseInt(this.$route.query.page) || 1
        const params = {
            limit: this.limit,
            offset: (page - 1) * this.limit,
            author: username,
        };
        username && getAllArticles(params).then(res => {
            this.articles = res.data.articles
            this.articlesCount = res.data.articlesCount
        })
    },
    methods: {
        follow(profile) {
            this.disabled = true
            if(profile.following) {
                // 取消关注
                unfollowUser(profile.username)
                profile.following = false
            } else {
                // 关注
                followUser(profile.username)
                profile.following = true
            }
            this.disabled = false
        }
    }
}
</script>

<style lang='less' scoped>
</style>