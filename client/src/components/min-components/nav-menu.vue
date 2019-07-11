<template>
    <div class="mdl-layout__drawer is-visible" aria-hidden="true">
        <header class="drawer mdl-color--indigo">
            <div class="drawer__avatar"></div>
            <span class="drawer__name">Пачев Артем Николаевич</span>
            <router-link :to="{ path: '/login' }">Выйти</router-link>
        </header>
        <nav class="drawer-navigation mdl-navigation mdl-color--blue-grey-800">
            <router-link :to="{ path: '/courses' }" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">list</i>
                Курсы
            </router-link>
            <router-link :to="{ path: '/cabinet' }" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">home</i>
                Личный кабинет
            </router-link>
            <router-link :to="{ path: '#' }" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">grade</i>
                Избранное
            </router-link>
            <router-link :to="{ path: '/books' }" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">book</i>
                Книги
            </router-link> 
        </nav>
    </div>
    <!--<div class="mdl-layout__drawer is-visible" aria-hidden="true">
        <header class="drawer mdl-color--indigo">
            <div class="drawer__avatar"></div>
            <span class="drawer__name">Пачев Артем Николаевич</span>
            <router-link :to="{ path: '/login' }">Выйти</router-link>
        </header>
        <nav class="drawer-navigation mdl-navigation mdl-color--blue-grey-800">
            <a href="/#/courses" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">list</i>
                Курсы
            </a>
            <a href="#" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">home</i>
                Личный кабинет
            </a>
            <a href="#" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">grade</i>
                Избранное
            </a>
            <a href="#" class="mdl-navigation__link drawer__link">
                <i class="mdl-color-text--white material-icons" role="presentation">book</i>
                Книги
            </a> 
        </nav>
    </div>-->
</template>

<style scoped>
    .mdl-layout__drawer {
        border: none;
    }
    .drawer {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding: 16px 0px;
        /* height: 151px; */
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: white;
    }
    .drawer__avatar {
        background-image: url(../../image/placeholder.jpg);
        background-position: center;
        background-size: 100%;
        border-radius: 50%;
        width: 128px;
        height: 128px;
    }
    .drawer__name {
        padding: 5px;
        font-size: 1.5rem;
        text-align: center;
    }
    .drawer a {
        color: white;
        text-decoration: none;
    }
    .mdl-color--indigo {
        background-color: #3f51b5;
    }
    .drawer__link {
        display: -webkit-box !important;
        display: -ms-flexbox !important;
        display: flex !important;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: white !important;
        font-weight: 500;
        padding: 16px 18px !important;
    }
    .drawer__link:hover {
        background-color: #1E2E36 !important;
    }
    .drawer__link:hover .material-icons {
        color: #4caf50 !important;
    }
    .material-icons {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.56);
        margin-right: 32px;
    }
    .drawer-navigation {
        padding: 0;
        flex-grow: 1;
    }
</style>