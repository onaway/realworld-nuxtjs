<template>
    <div class="home-page">

        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li v-if="user" class="nav-item">
                                <nuxt-link :to="{name: 'Home', query: { tab: 'your_feed' }}" exact class="nav-link"
                                    :class="{active: tab === 'your_feed'}">Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link :to="{name: 'Home', query: { tab: 'global_feed' }}" exact class="nav-link"
                                    :class="{active: tab === 'global_feed'}">Global Feed</nuxt-link>
                            </li>
                            <li v-if="tag" class="nav-item">
                                <nuxt-link :to="{name: 'Home', query: { tab: 'tag', tag: tag }}" exact class="nav-link"
                                    :class="{active: tab === 'tab'}"># {{ tag }}</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <!-- 文章列表 -->
                    <article-preview :articles="articles"></article-preview>

                    <!-- 分页 -->
                    <nav>
                        <ul class="pagination">
                            <li class="page-item" :class="{active: item === page}" v-for="item in totalPage">
                                <nuxt-link :to="{ name: 'Home', query: { page: item, tag: $route.query.tag, tab: tab } }" class="page-link">
                                    {{ item }}</nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <nuxt-link :to="{name: 'Home', query: { tag: tag, tab: 'tab' }}" v-for="tag in tags" :key="tag"
                                class="tag-pill tag-default">{{ tag }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllArticles, getFeedArticles } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
import ArticlePreview from './components/article-preview'

export default {
    name: "Home",
    components: {
        ArticlePreview
    },
    data() {
        return {};
    },
    async asyncData({ query, store }) {
        const page = parseInt(query.page) || 1;
        const limit = 10;
        const { tag, tab = "global_feed" } = query;
        const params = {
            limit,
            offset: (page - 1) * limit,
            tag,
        };
        const loadArticles =
            store.state.user && tab === "your_feed"
                ? getFeedArticles
                : getAllArticles;
        const [articleRes, tagRes] = await Promise.all([
            loadArticles(params),
            getTags(),
        ]);

        const { articles, articlesCount } = articleRes.data;
        const { tags } = tagRes.data;

        for (const item of articles) {
            item.disabled = false;
        }

        return {
            articles,
            articlesCount,
            tags,
            limit,
            page,
            tag,
            tab,
        };
    },
    watchQuery: ["page", "tag", "tab"], // 监听 page, tag, tab
    computed: {
        ...mapState(["user"]),
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit);
        },
    },
    methods: {

    },
};
</script>

<style lang='less' scoped>
</style>