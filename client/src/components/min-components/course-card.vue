<template>
    <div class="app">
        <main class="row course">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="course in courses">
                <div class="mdl-card mdl-shadow--2dp courses__card">
                    <router-link :to="{ path: '/auth' }">
                        <div class="mdl-card__title courses__image">
                            <img :src="course.image" alt="">
                        </div>
                        <div class="mdl-card__supporting-text courses__content">
                            <strong>{{ course.title }}</strong>
                            <p>{{ course.body }}</p>
                        </div>
                    </router-link>
                    <div class="mdl-card__actions mdl-card--border courses__action">
                        <div class="courses__rate">
                            <a href="#" class="courses__grade">
                                <i class="material-icons">grade</i>
                            </a>
                            <a href="#" class="courses__grade">
                                <i class="material-icons">grade</i>
                            </a>
                            <a href="#" class="courses__grade">
                                <i class="material-icons">grade</i>
                            </a>
                            <a href="#" class="courses__grade">
                                <i class="material-icons">grade</i>
                            </a>
                            <a href="#" class="courses__grade">
                                <i class="material-icons">grade</i>
                            </a>
                        </div>
                        <div class="courses__social">
                            <a href="#" class="courses__share">
                                <i class="material-icons">share</i>
                            </a>
                            <a href="#" class="courses__like">
                                <i class="material-icons">favorite</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import courses from './courses-card'
export default {
    data () {
        return {
            courses: courses
        }
    }
}
</script>

<style scoped>
    main {
        margin: 0;
    }
    .courses {
        height: 100%;
        padding: 0;
        margin: 0;
    }
    .mdl-card {
        margin: 20px 8px;
    }
    .courses__card {
        margin-left: auto;
        margin-right: auto;
        max-width: 95%;
    }
    .courses__image {
        padding: 16px 0;
        height: 150px;
    }
    .courses__image img {
        width: 100%;
        height: auto;
    }
    .mdl-card p {
        margin: 0;
        height: 40px;
        overflow: hidden;
        line-height: 1.3em;
    }
    .courses__card a {
        text-decoration: none;
        cursor: pointer;
    }
    .courses__action {
        display: flex;
        justify-content: space-between;
    }
    .courses__rate {
        display: flex;
    }
    .courses__action a {
        color: gray;
    }
    .courses__share {
        margin-left: 10px;
    }
    .courses__like {
        margin-left: 10px;
    }
</style>