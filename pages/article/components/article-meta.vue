<template>
    <div class="article-meta">
        <nuxt-link :to="{name: 'Profile', params: { username: article.author.username }}">
            <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
            <nuxt-link :to="{name: 'Profile', params: { username: article.author.username }}" class="author">
                {{ article.author.username }}</nuxt-link>
            <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>

        <!-- 自己的文章 -->
        <template v-if="isYourself">
            <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{ name: 'Editor', params: { slug: article.slug } }">
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>
            &nbsp;&nbsp;
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle(article.slug)">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </template>

        <!-- 他人的文章 -->
        <template v-else>
            <button class="btn btn-sm btn-outline-secondary" :class="{ active: article.author.following }">
                <i class="ion-plus-round"></i>
                Follow {{ article.author.username }}
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }">
                <i class="ion-heart"></i>
                &nbsp;
                Favorite Article <span class="counter">({{ article.favoritesCount }})</span>
            </button>
        </template>
    </div>
</template>

<script>
import { delArticle } from '@/api/article'

export default {
    name: "ArticleMeta",
    props: {
        article: {
            type: Object,
            require: true,
        },
        user: {
            type: Object,
            require: true
        }
    },
    data() {
        return {};
    },
    computed: {
        isYourself() {
            return this.article.author.username === this.user.username
        }
    },
    methods: {
        async deleteArticle(slug) {
            await delArticle(slug)
            this.$router.push({ name: 'Home' })
        }
    },
};
</script>

<style scoped>
</style>