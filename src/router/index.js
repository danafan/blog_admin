import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>System.import('@/components/login')
const index = resolve=>System.import('@/components/index')
const publication = resolve=>System.import('@/components/publication')
const rough = resolve=>System.import('@/components/rough')
const published = resolve=>System.import('@/components/published')
const reading = resolve=>System.import('@/components/reading')
const photos = resolve=>System.import('@/components/photos')
const statistics = resolve=>System.import('@/components/statistics')
const message = resolve=>System.import('@/components/message')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children:[
      { path: '/publication', component: publication},
      { path: '/rough', component: rough},
      { path: '/published', component: published},
      { path: '/reading', component: reading},
      { path: '/photos', component: photos},
      { path: '/statistics', component: statistics},
      { path: '/message', component: message}
    ]
    }
  ]
})

// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  let username = sessionStorage.getItem("username");
  let path = to.path;
  if(path != "/login"){
    if(!username){
      router.push('/login');
    }
  }else{
    if(!!username){
      router.go(-1);
    }
  }
  next()
})
export default router