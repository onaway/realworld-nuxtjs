<template>
    <div>
        <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
                <nuxt-link :to="{ name: 'Profile', params: { username: article.author.username } }">
                    <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                    <nuxt-link class="author" :to="{ name: 'Profile', params: { username: article.author.username } }">
                        {{ article.author.username }}</nuxt-link>
                    <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                </div>
                <button @click="praise(article)" class="btn btn-outline-primary btn-sm pull-xs-right"
                    :class="{ active: article.favorited }" :disabled="article.disabled">
                    <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
            </div>
            <nuxt-link :to="{ name: 'Article', params: { slug: article.slug } }" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { addFavorite, delFavorite } from "@/api/article";

export default {
    name: 'ArticlePreview',
    props: {
        articles: {
            type: Array,
            require: true
        }
    },
    data () {
        return {};
    },
    methods: {
        praise(article) {
            article.disabled = true
            if (article.favorited) {
                // 取消赞
                delFavorite(article.slug);
                article.favorited = false;
                article.favoritesCount += -1;
            } else {
                // 点赞
                addFavorite(article.slug);
                article.favorited = true;
                article.favoritesCount += 1;
            }
            article.disabled = false
        },
    }
}
</script>

<style lang='less' scoped>

</style>