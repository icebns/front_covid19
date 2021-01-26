import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import CourseDetail from '../views/CourseDetail/CourseDetail.vue'
import Login from '../views/Login/Login.vue'
import Order from '../views/Order/Order.vue'
import Pay from '../views/Pay/Pay.vue'
import Personal from '../views/Personal/Personal.vue'
import Register from '../views/Register/Register.vue'
import AdminHome from '../views/Administrators/AdminHome.vue'
import Report from '../views/Report/Report.vue'
import ReportUp from '../views/ReportUp/ReportUp.vue'
import Test from '../views/Test/TestPage.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path:"/",
      name:"Home",
      component:Home
    },
    {
      path:"/adminhome",
      name:"AdminHome",
      component:AdminHome
    },
    {
      path:"/report",
      name:"Report",
      component:Report
    },
    {
      path:"/reportup",
      name:"ReportUp",
      component:ReportUp
    },
    {
      path:"/coursedetail",
      name:"CourseDetail",
      //按需加载
      component : ()=>import("../views/CourseDetail/CourseDetail.vue")
      //component:CourseDetail
    },
    {
      path:"/login",
      name:"Login",
      component:Login
    },
    {
      path:"/order",
      name:"Order",
      component:Order,
      meta:{ requiresAuth : true}
    },{
      path:"/pay",
      name:"Pay",
      component:Pay,
      meta:{ requiresAuth : true}
    },{
      path:"/personal",
      name:"Personal",
      component:Personal,
      meta:{ requiresAuth : true}

    },{
      path:"/register",
      name:"Register",
      component:Register
    },,{
      path:"/test",
      name:"Test",
      component:Test
    }
  ]

const router = new VueRouter({
  routes
})

export default router
