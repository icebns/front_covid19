
import axios from '../request'

//注册接口
export const registerApi = (phone, pwd , name)=> axios.post("/api/v1/pri/user/register",{
    "phone":phone,
    "pwd":pwd,
    "name":name
})

//上报体温接口
export const addReportApi = (id, homeValue, temperatureValue, contactValue, gooutValue, healthValue)=> axios.post("/api/v1/pub/report/add_report",{
    "id":id,
    "home":homeValue,
    "temperature":temperatureValue,
    "contact":contactValue,
    "go_out":gooutValue,
    "health":healthValue
})


//登录接口
export const loginApi = (phone, pwd) => axios.post("/api/v1/pri/user/login",{
    phone,
    pwd
})



//轮播图接口
export const getBanner = () => axios.get("/api/v1/pub/video/list_banner")

//新闻列表接口
export const getVideoList = ()=> axios.get("/api/v1/pub/article/list")


//视频详情
export const getVideoDetail = (vid)=> axios.get("/api/v1/pub/video/find_detail_by_id?",{
    params: {
        video_id:vid
    }
})

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

//上报记录列表
export const getReportList = (uid)=>axios.get("/api/v1/pub/report/find_report_by_id?",{
    params:{
        "id":uid
    }
})

//用户信息接口
export const getUserInfo = (token)=>axios.get("/api/v1/pri/user/find_by_token",{
    params:{
        "token":token
    }
})

// //新闻列表
// export const getUserInfo = (token)=>axios.get("/api/v1/pri/article/list",{
//     params:{
//         "token":token
//     }
// })

// //新闻信息接口
// export const getUserInfo = (token)=>axios.get("/api/v1/pri/article/find_by_token",{
//     params:{
//         "token":token
//     }
// })

// //上报体温接口
// export const addReportApi = (token, uid)=>axios.post("/api/v1/pri/report/add_report",{
//     "id":uid
// },{
//     headers:{
//         "token":token
//     }
// })



// //上报信息接口
// export const getUserInfo = (token)=>axios.get("/api/v1/pri/article/find_by_token",{
//     params:{
//         "token":token
//     }
// })