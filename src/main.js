import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Contextmenu from 'vue-contextmenujs'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '@/style/index.less'

Vue.config.productionTip = false

Vue.use(Contextmenu);
Vue.use(ViewUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
