<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>
                <article-meta :article="article" :user="user" />
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12" v-html="article.body"></div>
            </div>

            <hr />

            <div class="article-actions">
                <article-meta :article="article" :user="user" />
            </div>

            <!-- 评论及评论列表 -->
            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <article-comment :slug="article.slug" :user="user" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticleDetail } from "@/api/article";
import ArticleMeta from "./components/article-meta";
import ArticleComment from "./components/article-comment";
import MarkdownIt from "markdown-it";
import { mapState } from 'vuex'

export default {
    components: { ArticleMeta, ArticleComment },
    name: "Article",
    data() {
        return {};
    },
    head() {
        // 自定义此页面的“标题”和“描述”
        return {
            title: `${this.article.title} - RealWorld`,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.article.description,
                },
            ],
        };
    },
    computed: {
        ...mapState(['user'])
    },
    async asyncData({ params }) {
        const { data } = await getArticleDetail(params.slug);
        const { article } = data;

        const md = new MarkdownIt();
        article.body = md.render(article.body);

        return {
            article
        };
    },
    methods: {},
};
</script>

<style lang='less' scoped>
</style>