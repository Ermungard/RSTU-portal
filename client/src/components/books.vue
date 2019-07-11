<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header mdl-shadow--4dp">
            <div class="mdl-layout__header-row">
            <router-link :to="{ path: '/courses' }" class="mdl-color-text--white">
                <i class="material-icons">keyboard_arrow_left</i>
            </router-link>
            <!-- Title -->
            <span class="mdl-layout-title">Книги</span>
            <!-- Add spacer, to align navigation to the right -->
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation. We hide it in small screens. -->
            <nav class="mdl-navigation mdl-layout--large-screen-only"></nav>
            </div>
        </header>
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Title</span>
            <nav class="mdl-navigation">
                <navmenu></navmenu>
            </nav>
        </div>
        <main class="mdl-layout__content">
            <div class="page-content">
                <listbooks></listbooks>
            </div>
        </main>
    </div>
</template>

<script>
    import navmenu from './min-components/nav-menu'
    import listbooks from './min-components/list-books'
    export default {
        components: {
            listbooks,
            navmenu
        }
    }
</script>

<style scoped>
    .material-icons {
        font-size: 2.5rem;
        vertical-align: middle;
    }
</style>