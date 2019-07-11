
/* v-bind:xxx => :xxx  */
/* v-on:xxx => @xxx  */
<template>
  <div class="content-body">
    
    <main-menu :routes="routes"/>
  
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {

  components:{
    'main-menu' : Menu
  },

  data(){
     return{
       routes: routes.filter(route => route.isEnabledInMenu)
     }
  }

}
</script>

<style>
  .content-body {
    font-family: Roboto, "Helvetica Neue", sans-serif;
    width: 96%;
    margin: 0 auto;
  }

    .page-enter, .page-leave-active {
    opacity: 0;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .4s;
  }


</style>
