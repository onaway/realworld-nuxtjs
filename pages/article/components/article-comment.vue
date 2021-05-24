<template>
    <div>
        <form class="card comment-form" @submit.prevent="postComment" v-if="user">
            <div class="card-block">
                <textarea v-model="params.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
                <img :src="user.image" class="comment-author-img" />
                <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
        </form>
        <p v-else>
            <nuxt-link to="/login">Sign in</nuxt-link> or <nuxt-link to="/register">sign up</nuxt-link>
            to add comments on this article.
        </p>

        <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
                <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
                <nuxt-link :to="{ name: 'Profile', params: { username: comment.author.username } }" class="comment-author">
                    <img :src="comment.author.image" class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <nuxt-link :to="{ name: 'Profile', params: { username: comment.author.username } }" class="comment-author">
                    {{ comment.author.username }}</nuxt-link>
                <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getComments, addComments } from '@/api/article'

export default {
    name: 'ArticleComment',
    props: {
        slug: {
            type: String,
            require: true
        },
        user: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            comments: [],
            params: {
                body: ''
            }
        };
    },
    async mounted() {
        const { data } = await getComments(this.slug)
        this.comments = data.comments
    },
    methods: {
        async postComment() {
            if (!this.params.body) return alert('请输入评论')
            const { data } = await addComments({ comment: this.params }, this.slug)
            this.comments.unshift(data.comment)
            this.params.body = ''
        },
    }
}
</script>

<style lang='less' scoped>
</style>