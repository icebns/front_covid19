
import axios from '../request'

/** ______________________User&Home___________________________*/
//注册接口
export const registerApi = (phone, pwd , name)=> axios.post("/api/v1/pri/user/register",{
    "phone":phone,
    "pwd":pwd,
    "name":name
}) 
//登录接口
export const loginApi = (phone, pwd) => axios.post("/api/v1/pri/user/login",{
    phone,
    pwd
})  
//用户信息接口
export const getUserInfo = (token)=>axios.get("/api/v1/pri/user/find_by_token",{
    params:{
        "token":token
    }
}) 
//轮播图接口
export const getBanner = () => axios.get("/api/v1/pub/video/list_banner") 
 



/** ______________________Article___________________________*/
//添加新闻/文章
export const addArticleApi = (article_author, article_title, article_img, article_content)=> axios.post("/api/v1/pub/article/add_article",{
  	"article_author":article_author,
	"article_title":article_title,
	"article_img":article_img,
	"article_content":article_content
}) 
//修改文章
export const changeArticleApi = (article_id, article_author, article_title, article_img, article_content, article_level)=> axios.post("/api/v1/pub/article/update_article",{
    "article_id":article_id,
	"article_author":article_author,
	"article_title":article_title,
	"article_img":article_img,
	"article_content":article_content,
	"article_level":article_level
}) 
//删除文章
export const deleteArticleApi = (articleId)=> axios.get("/api/v1/pub/article/delete_article_by_id?",{
    params: {
        articleId
    }
}) 
// //文章列表接口
// export const getArticleList = ()=> axios.get("/api/v1/pub/article/list")
//新闻列表接口
export const getVideoList = ()=> axios.get("/api/v1/pub/article/list")  
//详情
export const getArticleDetail = (articleId)=> axios.get("/api/v1/pub/article/find_article_by_id?",{
    params: {
        "articleId":articleId
    }
})



/** ______________________Report___________________________*/

//上报体温接口
export const addReportApi = (id, homeValue, temperatureValue, contactValue, gooutValue, healthValue)=> axios.post("/api/v1/pub/report/add_report",{
    "id":id,
    "home":homeValue,
    "temperature":temperatureValue,
    "contact":contactValue,
    "go_out":gooutValue,
    "health":healthValue
})
//上报记录列表接口
export const getAllReportList = ()=> axios.get("/api/v1/pub/report/list")
//单人上报记录列表
export const getReportList = (uid)=>axios.get("/api/v1/pub/report/find_report_by_id?",{
    params:{
        "id":uid
    }
}) 
//修改*/
export const changeReportApi = (reportId, home, temperature, contact, goOut,health)=> axios.post("/api/v1/pub/report/update_report",{
    "report_id":reportId, 
	"home":home,
	"temperature":temperature,
	"contact":contact,
    "go_out":goOut,
    "health":health
})
//删除上报记录接口
export const deleteReportApi = (ReportId)=>axios.get("/api/v1/pub/report/delete_report_by_report_id?",{
    params:{
        "reportId":ReportId
    }
})

 


/** ______________________Test___________________________*/
//添加检测报告
export const addTestApi = (id, test_img, test_result, test_doctor)=> axios.post("/api/v1/pub/test/add_test",{
    "id":id, 
	"test_img":test_img,
	"test_result":test_result,
	"test_doctor":test_doctor
})
//获取检测报告列表
export const getTestList = ()=> axios.get("/api/v1/pub/test/list")
//修改检测报告
export const changeTestApi = (id, test_id, test_img, test_result, test_doctor)=> axios.post("/api/v1/pub/patient/update_patient",{
    "id":id,
	"test_id":test_id,
	"test_img":test_img,
	"test_result":test_result,
	"test_doctor":test_doctor
}) 
//删除检测报告
export const deleteTestApi = (testId)=> axios.get("/api/v1/pub/test/delete_test_by_id?",{
    params: {
        testId
    }
})
// //添加图片
// export const addTestApi = (file)=> axios.post("/upload",{ 
// })



/** ______________________Patient___________________________*/

//添加病例
export const addPatientApi = (id, sex, age, source, state, way, hospital)=> axios.post("/api/v1/pub/patient/add_patient",{
    "id":id,
    "sex":sex,
    "age":age,
    "source":source,
    "state":state,
    "way":way,
    "hospital":hospital
})
//获取id，name
export const getNameList = ()=> axios.get("/api/v1/pub/patient/name_list")
//获取病例列表
export const getPatientList = ()=> axios.get("/api/v1/pub/patient/list")
//修改病例
export const changePatientApi = (patient_id, sex, age, source, state, way, hospital)=> axios.post("/api/v1/pub/patient/update_patient",{
    "patient_id":patient_id,
	"sex":sex,
	"age":age,
	"source":source,
	"state":state,
    "way":way,
    "hospital":hospital
}) 
//删除病例
export const deletePatientApi = (patientId)=> axios.get("/api/v1/pub/patient/delete_patient_by_patient_id?",{
    params: {
        patientId
    }
})



/***废弃 */

//下单接口
export const saveOrder = (token, vid)=>axios.post("/api/v1/pri/order/save",{
    "video_id":vid
},{
    headers:{
        "token":token
    }
})

//订单列表
export const getOrderList = (token)=>axios.get("/api/v1/pri/order/list",{
    params:{
        "token":token
    }
})