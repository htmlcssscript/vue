// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import router from './router'//路由配置全在这个文件里
import VueLazyload from 'vue-lazyload'
 

Vue.config.productionTip = false
fastclick.attach(document.body)//body下的所有元素都没有300ms延时

Vue.use(VueLazyload, {
  error: 'common/image/default.png'
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
