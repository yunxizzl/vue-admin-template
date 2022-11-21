
<template>
    <div>
        <div class="block">
            <el-cascader
            v-model="values"
            :options="options"
            @change="handleChange()"></el-cascader>
        </div>

    </div>
</template>
<script>
import {cascader} from "@/api/pcr";
export default {
    data(){
        return {
            values:[],
            options:[],
        }
    },
    methods:{
      
        handleChange(){
            this.$emit("prcchange",this.values);
        }
       
    },
    created(){
          cascader().then(res=>{
            this.options=res;
          })
    }
    
}
</script>