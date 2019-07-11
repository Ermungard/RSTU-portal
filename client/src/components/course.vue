<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header mdl-shadow--4dp">
            <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">Курсы</span>
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
                <course></course>
            </div>
        </main>
    </div>
</template>

<script>
import navmenu from './min-components/nav-menu'
import course from './min-components/course-card'
export default {
    components: {
        navmenu,
        course
    }
}
</script>

<style>
    .mdl-layout__header-row {
        padding-left: 60px;
    }
    .mdl-layout-title {
        font-weight: 200;
    }
    .mdl-layout__drawer {
        border: none;
    }
</style>