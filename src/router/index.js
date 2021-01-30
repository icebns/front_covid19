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
import ArticleAdd from '../views/Test/Other/ArticleAdd.vue'
import ArticleChange from '../views/Test/Other/ArticleChange.vue'
import ReportChange from '../views/Test/Other/ReportChange.vue'
import TestAdd from '../views/Test/Other/TestAdd.vue'
import TestChange from '../views/Test/Other/TestChange.vue'
import PatientAdd from '../views/Test/Other/PatientAdd.vue'
import PatientChange from '../views/Test/Other/PatientChange.vue'


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
      // component : ()=>import("../views/CourseDetail/CourseDetail.vue")
      component:CourseDetail
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
    },
    {
      path:"/pay",
      name:"Pay",
      component:Pay,
      meta:{ requiresAuth : true}
    },
    {
      path:"/personal",
      name:"Personal",
      component:Personal,
      meta:{ requiresAuth : true}

    },
    {
      path:"/register",
      name:"Register",
      component:Register
    },
    {
      path:"/test",
      name:"Test",
      component:Test,
      // 主页面配置模板,注意：child 中的path不可以携带 `/`,携带 `/`认定为根路径
      children: [
        {
          path:"articleadd",
          name:"ArticleAdd",
          component:ArticleAdd
        },
      ]
    },
    {
      path:"/articlechange",
      name:"ArticleChange",
      component:ArticleChange
    },
    {
      path:"/reportchange",
      name:"ReportChange",
      component:ReportChange
    },
    {
      path:"/testadd",
      name:"TestAdd",
      component:TestAdd
    },
    {
      path:"/testchange",
      name:"TestChange",
      component:TestChange
    },
    {
      path:"/patientadd",
      name:"PatientAdd",
      component:PatientAdd
    },
    {
      path:"/patientchange",
      name:"PatientChange",
      component:PatientChange
    }
  ]

const router = new VueRouter({
  routes
})

export default router
