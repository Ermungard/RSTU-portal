<template>
    <div class="row center-xs books">
        <div class="col-xs-12 col-sm-10 col-md-8">
            <div class="mdl-card mdl-shadow--2dp books__list">
                <div class="mdl-card__supporting-text books__text">
                    <div class="row start-xs">
                        <div class="col-xs">
                            <form action="#" class="books__search">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label books__search-box">
                                    <input class="mdl-textfield__input" type="text" id="book_name" name="name" value="">
                                    <label class="mdl-textfield__label" for="book_name">Введите название книги</label>
                                </div>
                                <button class="mdl-button mdl-js-button" type="submit">Найти</button>
                            </form>
                        </div>
                    </div>

                    <div class="row start-xs">
                        <div class="col-xs">
                            <ul class="mdl-list">
                                <li class="mdl-list__item" v-for="bookslist in bookslists">
                                    <router-link :to="{ path: '/' }">{{ bookslist.title }}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bookslists from './books-list'
export default {
    data () {
        return {
            bookslists: bookslists
        }
    }
}
</script>

<style scoped>
    .mdl-card {
        margin: 20px 8px;
    }
    .books__list {
        width: auto;
    }
    .books__text {
        max-width: 100%;
        width: auto;
    }
    .mdl-textfield {
        margin-left: 8px;
        margin-right: 8px
    }
    .books__search {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .books__search-box {
        flex-basis: 100%;
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>