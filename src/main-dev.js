import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import './assets/fonts/iconfont.css'
// 导入全局样式
import './assets/css/global.css'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import TreeTable from 'vue-table-with-tree-grid'

Vue.use(VueQuillEditor)
//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 请求拦截器
axios.interceptors.request.use((config) => {
  // 展示进度条
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 响应拦截器
axios.interceptors.response.use((res) => {
  NProgress.done()
  // return config
  if (res.data.meta.msg === '无效token' && res.data.meta.status === 400) {
    location.href = '/#/login'
  }
  return res
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
