<template>
    <div class="main">
        <!---->
        <div>

        </div>
        <!--订单列表-->
        <div class="list" v-if="report.length > 0">
            <cube-form-group>
                <cube-button @click="reportUp()">打卡</cube-button>
            </cube-form-group>
            <!-- <cube-form-group class="titbox">
                <p class="tit"> 打卡记录：</p>
            </cube-form-group> -->
            <div class="box" v-for="(item, index) of report" :key="index">
                <router-link :to="{path:'/coursedetail', query:{ video_id : item.video_id }}">
                    <div class="smallbox">
                        
                        <!-- <div class="imgdiv">
                            <img :src="item.video_img" alt="图片"/>
                        </div> -->

                        <div class="textdiv">
                            <p class="title"> {{item.report_time}} ------<span class="palces">{{item.report_place}}</span></p>
                            <!-- <p class="price"> </p> -->
                        </div>

                    </div>
                </router-link>
            </div>
            
            
        </div>

        <div class="no_order" v-else>
            <p>暂未有购买记录 </p>
        </div>

    <!--底部导航-->
        <common-footer></common-footer>

    </div>
</template> 
<script>
/**<div class="bgblack">
                <div class="formbox">
                    <cube-form :model="model" @submit="submitHandler">
                        <cube-form-group>
                        
                            <!--所在地-->
                            <cube-form-item :field="fields[0]"></cube-form-item>
                            <!--体温-->
                            <cube-form-item :field="fields[1]"></cube-form-item>
                            <!--接触-->
                            <cube-form-item :field="fields[2]"></cube-form-item>
                            <!--外出-->
                            <cube-form-item :field="fields[3]"></cube-form-item>
                            <!--健康-->
                            <cube-form-item :field="fields[4]"></cube-form-item>
                        </cube-form-group>

                        <!-- <cube-checkbox v-model="checked">
                            Checkbox
                        </cube-checkbox>111 -->
                        
                        <cube-form-group>
                            <cube-button type="submit">打卡</cube-button>
                        </cube-form-group>
                        <button class="btnclass" onclick="closebox()">取消</button>
                    </cube-form> 
                </div>
            </div> */
import CommonFooter from '@/components/CommonFooter';
// import { getOrderList } from "@/api/getData.js";

export default {

    components:{
        CommonFooter
    },

    data(){
        return{
            model: {
                homeValue: "",
                temperatureValue: "",
                contactValue:"",
                gooutValue:"",
                health:""
            },
            fields: [
                // {
                //     type: "input",
                //     modelKey: "homeValue",
                //     label: "今日所在地",
                //     props: {
                //         placeholder: "请选择今日所在地"
                //     },
                //     rules: {
                //         required: true
                //     },
                //     messages: {
                //         required: "所在地不能为空"
                //     }
                // }, 
                {
                    type: "input",
                    modelKey: "temperatureValue",
                    label: "今日体温",
                    props: {
                        placeholder: "请输入今日体温"
                    },
                    rules: {
                        required: true
                    },
                    messages: {
                        required: "体温不能为空"
                    }
                },
                {
                    // type: 'switch', 
                    // modelKey: "contactValue",
                    // label: '是否接触了确诊患者？',
                    // required: false,
                    type: 'radio',
                    modelKey: "contactValue",
                    props: {
                        placeholder:"a",
                        options:[
                            {
                                label:'否',
                                value:'0'
                            },
                            {
                                label:'是',
                                value:'1'
                            }
                        ],
                    },
                    label: '是否接触了确诊患者？',
                    required: true
                },
                {
                    type: 'switch', 
                    modelKey: "gooutValue",
                    label: '是否外出？',
                    required: false
                },
                {
                    type: 'switch', 
                    modelKey: "homeValue",
                    label: '是否变更当前登记地址？'
                    // required: true
                },
                {
                    type: 'input',
                    modelKey: "homeValue", 
                    props: {
                        placeholder: "请选择今日所在地"
                    },
                    on: 'switch',
                    required: true
                }
                ],
            report:[
                {
                    report_time:"2021-01-15",
                    report_place:"河北省石家庄市长安区"
                },
                {
                    report_time:"2021-01-14",
                    report_place:"河北省石家庄市长安区"
                }
            ]
        }
    },

    methods:{
        //获取订单列表
    // async getOrderList(){
    //     try{
    //         const result =  await getOrderList(this.$store.state.token)
    //         if(result.data.code == 0){
    //             this.orders = result.data.data || []
    //         }
    //         console.log(result)
    //     }catch(error){
    //         console.log(error)
    //     } 
    // }
        reportUp:function () {
            this.$router.push('./reportup');
        },
    //提交表单
        submitHandler(e, model) {
            console.log("tijiao"+e);
        }
    },
    mounted(){
        // this.getOrderList();
    }
    
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0 20px;
}
.titbox{
    border-bottom: solid 1px #DDD;
}
.tit{
    margin: 20px 0 0 10px;
    font-size: 1.1em;
}
button{
    margin: 20px 0 0;
}
// 视频个体
.box {
  padding: 5px 0 0px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  // 标题
  .title {
    font-size: 14px;
    margin-bottom: 15px;
  }
  // 订单详情
  .smallbox {
    //flex左右排列，两端对齐
    display: flex;
    justify-content: space-between;
    .imgdiv {
      width: 90px;
      height: 60px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .textdiv p {
      margin-top: 10px;
      padding-left: 10px;
    }
  }
}

.no_order {
  margin-top: 50px;
  text-align: center;
}
.palces{
    text-align: right;
}
.bgblack{
    position: fixed;
    box-sizing: border-box;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.85);
    color: rgb(232, 232, 232);
    font-family: Menlo, Consolas, monospace;
    font-size: large;
    padding: 2rem;
    line-height: 1.2;
    white-space: pre-wrap;
    overflow: auto;
}
.formbox{
    margin: 20px;
    border-radius: 2px;
    padding:5px;
    background: #fff;
}
.btnclass{
    display: block;
    margin: 0;
    padding: 17px 16px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: #fff;
    background: #4a4c5b;
    outline: none;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
</style>