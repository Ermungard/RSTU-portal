<template>
  <div class="row center-xs middle-xs main">
    <div class="form">
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="login">
            <label class="mdl-textfield__label" for="login">Логин</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="passwd">
            <label class="mdl-textfield__label" for="passwd">Пароль</label>
          </div>
        </form>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
          <router-link :to="{ path: '/courses' }">{{ msg }}</router-link>
        </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            msg: 'ВОЙТИ'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mdl-textfield {
    display: block;
    margin: 0 auto;
  }
  .main {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  a {
    display: block;
    height: 100%;
    position: relative;
    z-index: 1;
    text-decoration: none;
    color: black;
    padding: 0 16px 0 16px;
  }
  .mdl-button {
    padding: 0;
  }
</style>
