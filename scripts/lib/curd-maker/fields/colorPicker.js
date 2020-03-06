const field = {
    label:'颜色拾取',
    component:'el-color-picker',
    value:'',
    props:{
        showAlpha:{
            value:false,
            label:'支持透明',
            component:'el-switch'
        },
        colorFormat:{
            value:'hex',
            label:'颜色格式',
            component:'el-select',
            props:{
                options:[
                    {value:'hsl'},
                    {value:'hsv'},
                    {value:'hex'},
                    {value:'rgb'},
                ]
            }
        },
        predefine:{
            value:[],
            label:'预置颜色',
            component:'el-select',
            props:{
                multiple:true,
                filterable:true,
                allowCreate:true,
                clearable:true,
                options:[
                    {value:'#ff4500'},
                    {value:'#ff8c00'},
                    {value:'#ffd700'},
                    {value:'#90ee90'},
                    {value:'#00ced1'},
                    {value:'#1e90ff'},
                    {value:'#c71585'},
                ]
            }
        },
    }
};

export default field;