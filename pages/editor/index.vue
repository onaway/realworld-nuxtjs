<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @submit.prevent="publishArticle">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="params.title" type="text" class="form-control form-control-lg" placeholder="Article Title"
                                    required>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="params.description" placeholder="What's this article about?" type="text"
                                    class="form-control" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea v-model="params.body" placeholder="Write your article (in markdown)" class="form-control" rows="8"
                                    required></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control" placeholder="Enter tags">
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'

export default {
    middleware: 'authenticated',
    name: 'Editor',
    data() {
        return {
            params: {
                title: '',
                description: '',
                body: '',
                tagList: []
            },
            slug: ''
        };
    },
    async mounted() {
        this.slug = this.$route.params.slug
        if (this.slug) {
            const { data } = await getArticle(this.slug)
            console.log(data);
            const { title, description, body, tagList } = data.article
            this.params = {
                title,
                description,
                body,
                tagList
            }
        }
    },
    methods: {
        async publishArticle() {
            const appendArticle = this.slug ? updateArticle : createArticle
            const { data } = await appendArticle({ article: this.params }, this.slug)
            const { article } = data
            this.$router.push({ name: 'Article', params: { slug: article.slug } })
        }
    }
}
</script>

<style lang='less' scoped>
</style>