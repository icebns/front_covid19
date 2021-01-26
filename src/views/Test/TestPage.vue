<template>
  <div>
        <header>
            <div class="header">
                <span @click="$router.back(-1)"> <i class="cubeic-back"></i> </span>
                <div class="title">
                    体温上报页面
                </div>
            </div>
        </header>
        <div class="body">
            <!-- @submit="submitReport" -->
            <cube-form :model="model" @submit="submitHandler">
                <cube-form-group>
                    <!--体温-->
                    <cube-form-item :field="fields[0]"></cube-form-item>
                    <!--健康-->
                    <cube-form-item :field="fields[1]"></cube-form-item>
                    <!--接触-->
                    <cube-form-item :field="fields[2]"></cube-form-item>
                    <!--外出-->
                    <cube-form-item :field="fields[3]"></cube-form-item>
                    <!--所在地-->
                    <cube-form-item :field="fields[4]"></cube-form-item>
                    <!--用户id-->
                    <!-- <cube-form-item :field="fields[5]" class="display"></cube-form-item> -->
                </cube-form-group>

                <!-- <cube-checkbox v-model="checked">
                    Checkbox
                </cube-checkbox>111 -->
                <br/>
                <br/>
                <cube-form-group>
                    <cube-button type="submit">打卡</cube-button>
                </cube-form-group>
                <button class="btnclass" @click="$router.back(-1)">取消</button>
            </cube-form> 
        </div>
    </div>
</template>

<script>  
import { addReportApi,getUserInfo } from "@/api/getData.js";

export default {
  components: {
      
  },

  data() {
    return {
        info: {},
        model: {
                    id: "",
                    temperatureValue: "36.0℃",
                    healthValue:"良好",
                    contactValue:"否",
                    gooutValue:"否",
                    homeValue: "",
        },
        fields: [
            {
                type: "select",
                modelKey: "temperatureValue",
                label: "今日体温", 
                props: {
                    options: [{
                        value: "35.9℃",
                        text: "35.9℃"
                    },
                    {
                        value: "36.0℃",
                        text: "36.0℃"
                    },
                    {
                        value: "36.1℃",
                        text: "36.1℃"
                    },
                    {
                        value: "36.2℃",
                        text: "36.2℃"
                    },
                    {
                        value: "36.3℃",
                        text: "36.3℃"
                    },
                    {
                        value: "36.4℃",
                        text: "36.4℃"
                    },
                    {
                        value: "36.5℃",
                            text: "36.5℃"
                    }
                    ,
                    {
                        value: "36.6℃",
                            text: "36.6℃"
                    },
                    {
                        value: "36.7℃",
                            text: "36.7℃"
                    },
                    {
                        value: "36.8℃",
                            text: "36.8℃"
                    },
                    {
                        value: "36.9℃",
                            text: "36.9℃"
                    },
                    {
                        value: "37.0℃",
                            text: "37.0℃"
                    },
                    {
                        value: "37.1℃",
                            text: "37.1℃"
                    },
                    {
                        value: "37.2℃",
                            text: "37.2℃"
                    },
                    {
                        value: "37.3℃及以上",
                            text: "37.3℃及以上-体温异常，建议就医"
                    }
                    ]
                },
                rules: {
                    required: true
                },
                messages: {
                    required: "体温不能为空"
                }
            }, 
            {
                type: "select",
                modelKey: "healthValue",
                label: '健康状况',
                props: {
                    options: [{
                        value: "良好",
                        text: "良好"
                    },
                    {
                        value: "一般",
                        text: "一般"
                    },
                    {
                        value: "较差",
                        text: "较差"
                    },
                    {
                        value: "非常差，需要就医",
                        text: "非常差，需要就医"
                    }
                    ]
                },
                rules: {
                    required: true
                }
            },
            {
                type: "select",
                modelKey: "contactValue",
                label: '是否接触了确诊患者？',
                props: {
                    options: [{
                        value: "否",
                        text: "否"
                    },
                    {
                        value: "是",
                        text: "是"
                    },
                    {
                        value: "不确定",
                        text: "不确定"
                    }]
                },
                rules: {
                    required: true
                }
            },
            {
                type: "select",
                modelKey: "gooutValue",
                label: '是否外出？',
                props: {
                    options: [{
                        value: "否",
                        text: "否"
                    },
                    {
                        value: "是",
                        text: "是"
                    }
                    ]
                },
                rules: {
                    required: true
                }
            }, 
            {
                type: 'input',
                modelKey: "homeValue", 
                label: '当前所在地',
                props: {
                    placeholder: "请输入当前所在地址"
                },
                rules: {
                    required: true
                }
                
                // component: PCA,
                // modelKey: 'pcaValue',
                // label: '选择所在地',
                // rules: {
                //     required: true
                // },
                // messages: {
                //     required: '请选择'
                // }
                // on: {
                //     model: 'gooutValue',
                //     options: ['有外出']
                // }, 
            },
            {
                type: 'input',
                modelKey: "id", 
                label: '用户id', 
                disabled: true,
                rules: {
                    required: true
                }
            }
        ] 
    };
  },

  computed: {
    getToken() {
      return this.$store.state.token;
    }
  },

  methods: {
    //获取用户信息
    reportUp:function () {
        this.$router.push('./reportup');
    }, 
    async getInfo() {
      try {
        const result = await getUserInfo(this.getToken);
        if (result.data.code === 0) {
          this.info = result.data.data;
          this.model.id = result.data.data.id;
          console.log(this.model.id)
        }
      } catch (error) {
        console.log(error);
      }
    },
    //提交表单
    submitHandler(e, model) {
        console.log(model);
        e.preventDefault(); 
        //调用接口
        addReportApi(model.id, model.homeValue, model.temperatureValue, model.contactValue, model.gooutValue, model.healthValue).then(
            res => {
                if (res.data.code === 0) {
                    const toast = this.$createToast({
                    txt: "打卡成功",
                    type: "correct",
                    time: 1500
                    });
                    toast.show();
                }
            }
        );
        this.$router.push('./report');
    },
    
    
  },

  mounted() {
    if (this.getToken) {
      this.getInfo();
    }
  }
};
</script>


<style lang="scss" scoped>
.header {
    display: flex;//flex左右布局
    background-color:#07111b;;
    padding: 12px 20px;
    color: #fff;
}  
// 返回箭头
.cubeic-back {
    color: #fff;
    margin-right:5px;
}
//标题
.title {
    font-size: 16px;
    text-align: center;
    padding-left: 10px;
    width: 80%;
    //超出省略
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.body{
    margin: 10px;
}
.btnclass{
    display: block;
    margin-top: 5px;
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
.display{
    // display: none;
}
</style>