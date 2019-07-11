<template>
    <div class="cabinet row center-xs">
        <div class="col-lg-8 col-md-9 col-sm-10 col-xs-12">
            <div class="mdl-card mdl-shadow--2dp cabinet-card">
                <div class="mdl-card__supporting-text">
                    <div class="row middle-xs">
                        <div class="col-xs-12 col-sm-12 col-md-3 cabinet__avatar">
                            <img src="../../image/placeholder.jpg" alt="" class="cabinet__user-avatar">
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md center-xs start-md">
                            <div class="cabinet__user-name cabinet__user-left">Пачев Артем Николаевич</div>
                            <div class="cabinet__user-group">Россия, г. Ростов-на-Дону</div>
                            
                                <div class="cabinet__user-group">ЗБС-14-88</div>
                            
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md center-xs end-md">
                            <div class="cabinet__user-name cabinet__user-right">Активность пользователя</div>
                            <div class="cabinet__user-group">Комментарии: 0</div>
                            <div class="cabinet__user-group">Домашние работы: 0</div>
                        </div>
                    </div>
                    <hr>
                    <div class="row center-xs">
                        <div class="col-xs">
                            <div class="cabinet__title">Курсы</div>
                        </div>
                    </div>
                    
                        <div class="row middle-xs">
                            <div class="col-xs-3 cabinet__course-row">
                                <a href="/course/3/">
                                    <img src="../../image/logo3.png" alt="" class="cabinet-course__image">
                                </a>
                            </div>
                            <div class="col-xs-5 cabinet__course-row">
                                <div class="cabinet__user-name" style="word-wrap: break-word;">C# Starter</div>
                                
                            </div>
                            <div class="col-xs end-xs">
                                <div class="cabinet__user-name">Пройдено уроков: 4/9</div>
                                <div class="mdl-progress mdl-js-progress cabinet__progress is-upgraded" data-value="44.0" data-upgraded=",MaterialProgress"><div class="progressbar bar bar1" style="width: 44%;"></div><div class="bufferbar bar bar2" style="width: 100%;"></div><div class="auxbar bar bar3" style="width: 0%;"></div></div>
                            </div>
                        </div>
                    
                        <div class="row middle-xs">
                            <div class="col-xs-3 cabinet__course-row">
                                <a href="/course/2/">
                                    <img src="../../image/logo2.png" alt="" class="cabinet-course__image">
                                </a>
                            </div>
                            <div class="col-xs-5 cabinet__course-row">
                                <div class="cabinet__user-name" style="word-wrap: break-word;">C# Essential</div>
                                
                            </div>
                            <div class="col-xs end-xs">
                                <div class="cabinet__user-name">Пройдено уроков: 3/18</div>
                                <div class="mdl-progress mdl-js-progress cabinet__progress is-upgraded" data-value="16.0" data-upgraded=",MaterialProgress"><div class="progressbar bar bar1" style="width: 16%;"></div><div class="bufferbar bar bar2" style="width: 100%;"></div><div class="auxbar bar bar3" style="width: 0%;"></div></div>
                            </div>
                        </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .cabinet-card {
        width: 95%;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .mdl-card {
        margin: 20px 8px;
    }
    .cabinet__user-name {
        padding: 5px;
        font-size: 1.5rem;
    }
    .cabinet__progress {
        margin: 8px;
        width: 100%;
    }
    .cabinet__title {
        padding: 5px;
        font-size: 2rem;
    }
    .cabinet__user-group {
        padding: 5px;
        font-size: 1.2rem;
    }
    .cabinet__course-row {
        padding: 16px;
    }
    .cabinet__user-avatar {
        border-radius: 50%;
        width: 128px;
        height: 128px;
    }
    .cabinet-course__image {
        height: auto;
        width: 100%;
    }
</style>