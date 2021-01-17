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
            <cube-form :model="model" @submit="submitReport">
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
                    <!-- <cube-form-item :field="fields[5]"></cube-form-item> -->
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
import { cityData } from "@/api/area.js";

const PCA = {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selected: []
    }
  },
  render(createElement) {
    return createElement('cube-button', {
      on: {
        click: this.showPicker
      }
    }, this.selected.length ? this.selected.join(' ') : 'placeholder')
  },
  mounted() {
    this.picker = this.$createCascadePicker({
      title: 'PCA Select',
      data: cityData,
      selectedIndex: this.value,
      onSelect: this.selectHandler
    })
  },
  methods: {
    showPicker() {
      this.picker.show()
    },
    selectHandler(selectedVal, selectedIndex, selectedTxt) {
      this.selected = selectedTxt
      this.$emit('input', selectedVal)
    }
  }
}
export default {

    components:{
        
    },

    data(){
        return{
            model: {
                temperatureValue: "",
                healthValue:"",
                contactValue:"",
                gooutValue:"",
                homeValue: "",
            },
            add:"11111",
            fields: [
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
                    type: "select",
                    modelKey: "healthValue",
                    label: '健康状况',
                    props: {
                        options: [{
							value: 0,
							text: "良好"
						},
						{
							value: 1,
							text: "一般"
                        },
                        {
							value: 2,
							text: "较差"
                        },
                        {
							value: 3,
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
							value: 0,
							text: "否"
						},
						{
							value: 1,
							text: "是"
						},
						{
							value: 2,
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
							value: 0,
							text: "没有外出"
						},
						{
							value: 1,
							text: "有外出"
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
</style>