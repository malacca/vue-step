const field = {
    label:'计数器',
    component:'el-input-number',
    value:"",
    props:{
        controls:{
            value:true,
            label:'启用按钮',
            span:10,
            component:'el-switch',
        },
        controlsPosition:{
            value:"default",
            label:null,
            span:14,
            vshow:['controls', true],
            component:'el-radio-group',
            props:{
                options:[
                    {
                        label:"两侧",
                        value:'default'
                    },
                    {
                        label:"右侧",
                        value:'right'
                    },
                ]
            },
        },
        min:{
            value:undefined,
            label:'最小值',
            component:'el-input-number',
        },
        max:{
            value:undefined,
            label:'最大值',
            component:'el-input-number',
        },
        precision:{
            value:undefined,
            label:'数字精度',
            component:'el-input-number',
        },
        step:{
            value:1,
            label:'计数步长',
            component:'el-input-number',
        },
        stepStrictly:{
            value:false,
            label:'严格步数',
            component:'el-switch',
        }
    }
};

export default field;