import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from './store'
import vuetify from './plugins/vuetify';
import Meta from 'vue-meta';
// @ts-ignore
import vueParticles from 'vue-particles';

Vue.use(vueParticles)
Vue.use(Meta)

Vue.config.productionTip = false

const store = createStore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
